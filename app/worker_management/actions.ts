'use server'

import prisma from "@/lib/prisma";

export async function getWorkers() {
  return await prisma.worker.findMany()
}

export async function getHistory() {
  return await prisma.history.findMany()
}

export async function getProducts() {
  return await prisma.product.findMany()
}

export async function getLastUpdate() {
  const lastEntry = await prisma.history.findFirst({
    orderBy: {
      tanggal: 'desc'
    },
    select: {
      tanggal: true
    }
  })
  return lastEntry?.tanggal || null
}

export async function createWorker(data: { nama: string; email: string; password?: string }) {
  const newWorker = await prisma.worker.create({
    data: {
      nama: data.nama,
      email: data.email,
      password: data.password || "####",
    }
  })
  return newWorker
}

export async function deleteWorker(id: number) {
  await prisma.worker.delete({
    where: { id }
  })
}

export async function verifyWorkerLogin(id: number, passwordAttempt: string) {
  const worker = await prisma.worker.findUnique({
    where: { id }
  })

  if (worker && worker.password === passwordAttempt) {
    return {
      success: true,
      worker: {
        id: worker.id,
        nama: worker.nama,
        email: worker.email,
      }
    }
  }

  return { success: false }
}