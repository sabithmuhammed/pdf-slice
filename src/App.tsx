import { pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/Page/TextLayer.css";
import UploadComponent from "./components/UploadComponent";
import ShowPages from "./components/ShowPages";
import { downloadPdf, uploadPdf } from "../api/pdfApi";
import { message } from "antd";
import { FilePdfFilled } from "@ant-design/icons";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function App() {
    const [pdf, setPdf] = useState<string>(localStorage.getItem("pdf") || "");

    const handlePdfUpload = async (file: File) => {
        const data = new FormData();
        data.append("pdf", file);
        const response = await uploadPdf(data);
        if (response && response.data) {
            localStorage.setItem("pdf", response.data.filename);
            setPdf(response.data.filename);
        }
    };

    const handleDownload = async (pageNumbers: number[]) => {
        try {
            const response = await downloadPdf(pdf, pageNumbers);
            console.log(response.data);

            if (response.data && response.data.size > 0) {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });

                // Create a link element, trigger download
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "extracted-pages.pdf"; // Name of the downloaded file
                document.body.appendChild(link);
                link.click();

                // Clean up
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            } else {
                throw new Error("Received empty PDF data");
            }
        } catch (error) {
            console.error("Error handling PDF download:", error);
            message.error("Error downloading PDF. Please try again.");
        }
    };

    return (
        <div className="min-h-dvh bg-gray-800 w-full relative">
            <nav className=" max-w-7xl w-full flex p-3 mx-auto bg-gray-900 justify-between sticky top-0 z-20 shadow-md">
                <div className="flex items-center text-blue-400  text-xl">
                    <FilePdfFilled className="text-3xl text-blue-600 me-2" />
                    <p>PDF.slice</p>
                </div>
                <button
                    className="text-blue-400 font-light underline cursor-pointer hover:text-blue-500"
                    onClick={() => setPdf("")}
                >
                    Upload another pdf
                </button>
            </nav>
            <main className="max-w-7xl w-full min-h-dvh flex pt-2 mx-auto">
                {pdf ? (
                    <ShowPages
                        pdf={`${import.meta.env.VITE_BASE_URL}/static/${pdf}`}
                        handleDownload={handleDownload}
                    />
                ) : (
                    <UploadComponent handlePdfUpload={handlePdfUpload} />
                )}
            </main>
        </div>
    );
}

export default App;
