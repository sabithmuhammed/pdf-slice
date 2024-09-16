import {
    CheckCircleOutlined,
    DownloadOutlined,
    WarningOutlined,
} from "@ant-design/icons";
import { FloatButton, Spin } from "antd";
import { useState } from "react";
import { Document, Page } from "react-pdf";

const ShowPages = ({
    pdf,
    handleDownload,
}: {
    pdf: string;
    handleDownload: (pageNumbers: number[]) => void;
}) => {
    const [pageCount, setPageCount] = useState(0);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);

    const handleCheck = (pageNum: number) => {
        if (selectedPages.includes(pageNum)) {
            setSelectedPages((p) => p.filter((num) => num !== pageNum));
        } else {
            setSelectedPages((p) => [...p, pageNum]);
        }
    };

    return (
        <div className="w-full h-full relative">
            {selectedPages.length !== 0 && (
                <div className=" bg-gray-900/90 h-[100px] fixed top-12 max-w-7xl mt-3 w-full justify-start gap-2 z-10 px-2 flex items-center overflow-auto shadow-md">
                    {selectedPages.map((pageNum) => (
                        <div
                            className="w-[60px] bg-white h-[80px] flex justify-center items-center flex-shrink-0"
                            key={pageNum}
                        >
                            <div className="w-[40px] h-[40px] flex rounded-full font-semibold text-white justify-center items-center bg-blue-400">
                                {pageNum}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Document
                file={pdf}
                onLoadSuccess={({ numPages }) => setPageCount(numPages)}
                className={"flex gap-4 flex-wrap w-full h-full justify-center"}
                loading={
                    <div className=" absolute top-0 left-0 right-0 bottom-0 flex h-dvh flex-col justify-center items-center ">
                        <Spin size="large" />
                        <p className="text-white">Loading PDF...</p>
                    </div>
                }
                error={
                    <div className=" absolute top-0 left-0 right-0 bottom-0 flex h-dvh flex-col justify-center items-center ">
                        <WarningOutlined className="text-xl" />
                        <p className="text-white">Error loading pdf</p>
                    </div>
                }
            >
                {pageCount !== 0 &&
                    Array(pageCount)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index} className="">
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => handleCheck(index + 1)}
                                >
                                    <Page
                                        pageNumber={index + 1}
                                        className={""}
                                        width={200}
                                        renderAnnotationLayer={false}
                                        renderTextLayer={false}
                                    />
                                    {selectedPages.includes(index + 1) && (
                                        <div className="absolute bg-white/60 top-0 right-0 bottom-0 left-0 w-full h-full self-center items-center flex justify-center">
                                            <CheckCircleOutlined className="text-3xl text-blue-500" />
                                        </div>
                                    )}
                                </div>
                                <p className="text-white text-center">
                                    Page-{index + 1}
                                </p>
                            </div>
                        ))}
            </Document>
            {selectedPages.length !== 0 && (
                <FloatButton
                    shape="circle"
                    type="primary"
                    style={{ insetInlineEnd: 50 }}
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownload(selectedPages)}
                />
            )}
        </div>
    );
};

export default ShowPages;
