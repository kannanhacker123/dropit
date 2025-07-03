import Image from 'next/image';
import React from 'react';
import SplitText from "../../components/my/SplitText";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='flex bg-gradient-to-r from-[#298ab0] to-blue-400 min-h-screen'>
            <section className='lg:flex hidden flex-1/2 flex-col items-center justify-center h-screen p-8'>
                {/* Brand */}
                <div className='flex mb-8 items-center justify-center shadow-lg p-4 rounded-2xl'>
                    <Image
                        src={"/my/logo.jpeg"}
                        alt={"Brand"}
                        width={100}
                        height={100}
                        className='rounded-full' />
                    <h1 className='ml-4 text-6xl'>
                        <SplitText
                            text="Dropit"
                            className="text-5xl font-semibold text-center"
                            delay={100}
                            duration={0.6}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 40 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            rootMargin="-100px"
                            textAlign="center"
                        />
                    </h1>
                </div>
                {/* slogan  */}
                <p className='text-2xl text-center text-white max-w-md'>
                    Your one-stop solution for seamless file sharing and collaboration.
                </p>

            </section>
            <section className='flex-1/2 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg'>
                {children}
            </section>
        </main>
    );
};



export default function AuthLayoutDemo({ children }: { children: React.ReactNode }) {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    );
}