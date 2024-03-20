import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function loadPdf(path: string) {
  const loader = new PDFLoader(path);
  const docs = await loader.load();

  const docSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100,
    separators: ["\n\n"],
  });

  const splitDocs = await docSplitter.splitDocuments(docs);

  return splitDocs;
}
