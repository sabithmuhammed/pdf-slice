import { CloudUploadOutlined } from "@ant-design/icons";
import { Upload, message, Button, UploadProps, UploadFile } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useState } from "react";

type PropType = {
    handlePdfUpload: (file: File) => void;
};

const UploadComponent = ({ handlePdfUpload }: PropType) => {
    const [file, setFile] = useState<UploadFile | null>(null); // State for the uploaded file

    const props: UploadProps = {
        accept: ".pdf", // Only allow PDF files
        onRemove: () => {
            setFile(null); // Remove the file from state
        },
        beforeUpload: (file) => {
            if (file.type !== "application/pdf") {
                message.error("You can only upload PDF files!");
                return Upload.LIST_IGNORE; // Ignore non-PDF files
            }
            // Map the File object to an UploadFile object with necessary properties
            setFile({
                uid: file.uid, // uid is required by UploadFile
                name: file.name,
                status: "done", // Set a status (could be 'uploading', 'done', etc.)
                url: "", // Optional, used if you want to preview the file
                originFileObj: file, // Store the actual file object
            });
            return false; // Prevent automatic upload
        },
        fileList: file ? [file] : [], // Only show the selected file as an UploadFile array
    };

    const handleUpload = () => {
        if (!file || !file.originFileObj) return;

        const formData = new FormData();
        formData.append("file", file.originFileObj); // Use the original file object
        handlePdfUpload(file.originFileObj);

        // fetch("https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload", {
        //     method: "POST",
        //     body: formData,
        // })
        //     .then((res) => res.json())
        //     .then(() => {
        //         message.success(`${file.name} uploaded successfully.`);
        //         setFile(null); // Clear the file after successful upload
        //     })
        //     .catch(() => {
        //         message.error(`${file.name} upload failed.`);
        //     });
    };

    return (
        <div className="w-full h-full flex  items-center justify-center self-center">
            <div className="max-w-[500px] w-full flex flex-col  items-center text-white">
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined />
                    </p>
                    <p className=" text-white">
                        Click or drag a PDF file to this area to upload
                    </p>
                    <p className="text-slate-300">
                        Only PDF files are allowed.
                    </p>
                </Dragger>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={!file} // Disable the button if no file is selected
                    style={{ marginTop: 32 }}
                >
                    Upload
                </Button>
            </div>
        </div>
    );
};

export default UploadComponent;
