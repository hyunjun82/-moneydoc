import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>복잡한 금융·법률·세금 이야기를 누구나 이해할 수 있게 풀어내는 머니 가이드.</p>
          </div>
          <div className="footer-col">
            <h4>카테고리</h4>
            <ul>
              <li><a href="/savings/">저축</a></li>
              <li><a href="/loan/">대출</a></li>
              <li><a href="/realestate/">부동산</a></li>
              <li><a href="/tax/">세금</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>둘러보기</h4>
            <ul>
              <li><a href="/insurance/">보험</a></li>
              <li><a href="/pension/">연금</a></li>
              <li><a href="/law/">법률</a></li>
              <li><a href="/gov/">정부지원금</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>회사</h4>
            <ul>
              <li><a href="/about/">소개</a></li>
              <li><a href="/contact/">문의하기</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <p>© 2026 MoneyDoc. 모든 계산은 정부 공식 자료 기준.</p>
          <div className="footer-legal">
            <a href="/terms/">이용약관</a>
            <a href="/privacy/">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
