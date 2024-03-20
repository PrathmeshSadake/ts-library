import { generateEmbeddings } from "./embeddings";
import { loadPdf } from "./pdf-loader";

async function main() {
  const res = await loadPdf("docs/filename.pdf");
  console.log(res);
  const data = await generateEmbeddings(res);
  console.log(data);
}
main();
