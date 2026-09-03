import { redirect } from "next/navigation";

export const metadata = {
  title: "해외주식 양도세 계산기, 주식 양도세 통합 페이지로 이동",
  description: "해외주식 양도세는 통합된 주식 양도세 계산기로 이동되었습니다.",
  alternates: { canonical: "/tax/stock-transfer-tax/" },
};

export default function Page() {
  redirect("/tax/stock-transfer-tax/");
}
