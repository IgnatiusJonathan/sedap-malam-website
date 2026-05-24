import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: any) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) }
  });
  return Response.json(product);
}

export async function PUT(req: Request, { params }: any) {
  const body = await req.json();

  if (body.stok !== undefined && body.stok <= 0) {
    const deleted = await prisma.product.delete({
      where: { id: Number(params.id) }
    });
    return Response.json({ message: "Value must be more than 0", ...deleted });
  }

  const updated = await prisma.product.update({
    where: { id: Number(params.id) },
    data: body,
  });

  return Response.json(updated);
}

export async function DELETE(req: Request, { params }: any) {
  const deleted = await prisma.product.delete({
    where: { id: Number(params.id) }
  });

  return Response.json(deleted);
}
