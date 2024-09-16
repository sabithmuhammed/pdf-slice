import Api from "../services/api";
import pdfEndpoints from "../services/endpoints/pdfEndpoint";

export const uploadPdf = async (data: FormData) => {
    const response = await Api.post(pdfEndpoints.upload, data);
    return response;
};

export const downloadPdf = async (filename: string, pageNumbers: number[]) => {
    const response = await Api.get(pdfEndpoints.download + `/${filename}`, {
        params: {
            pageNumbers,
        },
        responseType: "blob",
    });
    return response;
};
