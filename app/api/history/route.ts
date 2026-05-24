import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, namaKasir, namaPembeli } = body;

        if (!items || !Array.isArray(items)) {
            return NextResponse.json({ error: 'Item data tidak ada' }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
            for (const item of items) {
                // 1. Decrement stock
                const updatedProduct = await tx.product.update({
                    where: { id: item.id },
                    data: {
                        stok: {
                            decrement: item.jumlah
                        }
                    }
                });

                if (updatedProduct.stok <= 0) {
                    await tx.product.delete({
                        where: { id: item.id }
                    });
                    console.log(`Product ${item.id} deleted due to zero stock.`);
                }

                await tx.history.create({
                    data: {
                        product: item.nama,
                        jumlah: item.jumlah,
                        harga: item.harga * item.jumlah,
                        pembeli: namaPembeli || 'Umum',
                        kasier: namaKasir || 'Kasir',
                        tanggal: new Date(),
                    },
                });
            }
        });

        return NextResponse.json({ message: 'History tersimpan dan stok terupdate' }, { status: 200 });
    } catch (error: any) {
        console.error('Error menyimpan history:', error);
        return NextResponse.json({ error: 'Gagal menyimpan history', details: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const history = await prisma.history.findMany({
            orderBy: {
                tanggal: 'desc',
            },
        });
        return NextResponse.json(history, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching history:', error);
        return NextResponse.json({ error: 'Gagal mengambil data history', details: error.message }, { status: 500 });
    }
}
