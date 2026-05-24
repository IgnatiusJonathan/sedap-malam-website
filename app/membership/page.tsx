"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Content from "@/components/content";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

type Member = {
    id: number;
    name: string;
    tanggal: string;
    noTelp: string;
    email: string;
};

const MembershipPage = () => {
    const router = useRouter();
    const [members, setMembers] = useState<Member[]>([]);

    const loadMembers = async () => {
        try {
            const res = await fetch("/api/members");
            if (!res.ok) {
                console.error("Failed to fetch members, status:", res.status);
                setMembers([]);
                return;
            }
            const data = await res.json();

            if (Array.isArray(data)) {
                setMembers(data);
            } else {
                console.error("Unexpected data format:", data);
                setMembers([]);
            }
        } catch (error) {
            console.error("Failed to load members:", error);
            setMembers([]);
        }
    };

    useEffect(() => {
        loadMembers();
        const rows = document.querySelectorAll(".member-row");
        rows.forEach((row, i) => {
            (row as HTMLElement).style.opacity = "0";
            (row as HTMLElement).style.transform = "translateY(8px)";
            setTimeout(() => {
                (row as HTMLElement).style.transition = "all 0.4s ease";
                (row as HTMLElement).style.opacity = "1";
                (row as HTMLElement).style.transform = "translateY(0)";
            }, i * 80);
        });
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <div className="flex flex-1">
                <Navbar />
                <Content>
                    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mx-auto">
                        {/* Header Title & Button */}
                        <div className="flex justify-between items-center mb-5">
                            <h1 className="text-2xl font-bold text-[#800000] tracking-wide">
                                📋 Daftar Membership
                            </h1>

                            <button
                                onClick={() => router.push("/add_member")}
                                className="bg-[#800000] hover:bg-[#a32626] text-white font-medium py-2 px-4 rounded-lg transition"
                            >
                                + Add Membership
                            </button>
                        </div>

                        {/* Table */}
                        <div className="border rounded-xl overflow-hidden">
                            {/*Header*/}
                            <div className="grid grid-cols-4 bg-[#800000] text-white font-semibold text-sm p-3">
                                <span>Nama</span>
                                <span>Email</span>
                                <span>No. Telepon</span>
                                <span>Tanggal Bergabung</span>
                            </div>

                            {/*Isi/Content*/}
                            <div className="max-h-[350px] overflow-y-auto">
                                {members.map((m, i) => (
                                    <div
                                        key={m.id}
                                        className="member-row grid grid-cols-4 border-b p-3 text-sm hover:bg-gray-50"
                                    >
                                        <span>{m.name}</span>
                                        <span>{m.email}</span>
                                        <span>{m.noTelp}</span>
                                        <span>{new Date(m.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Content>
            </div>
            <Footer />
        </div>
    );
};

export default MembershipPage;
