export default function CardLayout({ title, children }) {
    return (
        <main className="min-h-screen grid place-items-center bg-[#f1f3f9]">
            <div className="bg-white rounded-md p-5 flex flex-col gap-4 w-5/12">
                <h2 className="text-lg font-bold">{title}</h2>
                {children}
            </div>
        </main>
    );
}