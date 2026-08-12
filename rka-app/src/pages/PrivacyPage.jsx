import React from 'react';
import { about } from '../data/data';

const SECTIONS_EN = [
  {
    heading: '1. Personal Information Collected',
    body: `Required: name, email address, shipping address, phone number (entered when placing an order)\nAutomatically collected: IP address, access logs, visit history\nNote: The Website does not have a separate account registration process and does not collect account information such as a username or password.`,
  },
  {
    heading: '2. Purpose of Collection and Use',
    body: `- Delivery and processing of ordered products\n- Payment confirmation and order history management\n- Receiving and responding to inquiries submitted through the Contact page\n- Sending order confirmation emails`,
  },
  {
    heading: '3. Retention Period',
    body: `In accordance with the Act on Consumer Protection in Electronic Commerce and other applicable laws, the Company retains the following records for the periods indicated before destroying them:\n- Records of contracts or withdrawal of subscription: 5 years\n- Records of payment and supply of goods: 5 years\n- Records of consumer complaints or dispute resolution: 3 years`,
  },
  {
    heading: '4. Third-Party Provision and Outsourcing',
    body: `To provide the Service smoothly, the Company outsources the processing of personal information as follows:\n- PayPal: payment processing\n- Google (Google Sheets): recording and managing order details\n- Google (Gmail): sending order confirmation emails\n- Vercel: website hosting\n- Render: backend server hosting\nExcept where required by law or with the user's separate consent, the Company does not provide personal information to third parties.`,
  },
  {
    heading: '5. Destruction Procedure and Method',
    body: `The Company destroys personal information without delay once the retention period has elapsed or the purpose of processing has been achieved. Personal information stored in electronic file form is deleted using methods that make recovery impossible.`,
  },
  {
    heading: '6. User Rights',
    body: `Users may request to view, correct, or delete their personal information at any time by contacting ${about.contact.email}; the Company will respond without delay.`,
  },
  {
    heading: '7. Cookies',
    body: `The Website does not use cookies for advertising or user tracking. It uses the browser's local storage (localStorage) only to remember the user's selected language (Korean/English), which can be cleared at any time through browser settings.`,
  },
  {
    heading: '8. Personal Information Protection Contact',
    body: `To protect users' personal information and respond promptly to related inquiries, the Company operates the following contact point:\nContact: RKA Studio Customer Center\nEmail: ${about.contact.email}\nPhone: ${about.contact.phone}`,
  },
];

const SECTIONS_KR = [
  {
    heading: '1. 수집하는 개인정보 항목',
    body: `필수 항목: 이름, 이메일 주소, 배송지 주소, 연락처 (주문 시 입력)\n자동 수집 항목: IP 주소, 접속 로그, 방문 기록\n※ 본 웹사이트는 별도의 회원가입 절차가 없으며, 아이디·비밀번호 등 계정 정보는 수집하지 않습니다.`,
  },
  {
    heading: '2. 개인정보의 수집 및 이용 목적',
    body: `- 주문 상품의 배송 및 처리\n- 결제 확인 및 구매 내역 관리\n- 문의(Contact) 접수 및 답변\n- 주문 완료 안내 이메일 발송`,
  },
  {
    heading: '3. 개인정보의 보유 및 이용 기간',
    body: `회사는 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관계 법령에 따라 다음의 정보를 아래 기간 동안 보관한 후 파기합니다.\n- 계약 또는 청약철회 등에 관한 기록: 5년\n- 대금결제 및 재화 등의 공급에 관한 기록: 5년\n- 소비자의 불만 또는 분쟁처리에 관한 기록: 3년`,
  },
  {
    heading: '4. 개인정보의 제3자 제공 및 위탁',
    body: `회사는 원활한 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하고 있습니다.\n- PayPal: 결제 처리\n- Google (Google Sheets): 주문 내역 기록·관리\n- Google (Gmail): 주문 확인 이메일 발송\n- Vercel: 웹사이트 호스팅\n- Render: 서버(백엔드) 호스팅\n회사는 법령에 근거하거나 이용자의 별도 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.`,
  },
  {
    heading: '5. 개인정보의 파기 절차 및 방법',
    body: `회사는 개인정보 보유기간이 경과하거나 처리 목적이 달성된 경우 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태로 저장된 개인정보는 복구가 불가능한 기술적 방법을 사용하여 삭제합니다.`,
  },
  {
    heading: '6. 이용자의 권리',
    body: `이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제를 요청할 수 있으며, 이메일(${about.contact.email})로 문의 시 지체 없이 조치합니다.`,
  },
  {
    heading: '7. 쿠키의 운용 및 거부',
    body: `본 웹사이트는 광고 또는 이용자 추적을 위한 쿠키를 사용하지 않습니다. 다만 이용자가 선택한 언어(한국어/영어) 설정을 기억하기 위해 브라우저의 로컬 저장소(localStorage)를 사용하며, 이는 브라우저 설정에서 언제든지 삭제할 수 있습니다.`,
  },
  {
    heading: '8. 개인정보 보호책임자',
    body: `회사는 이용자의 개인정보를 보호하고 관련 문의에 신속히 대응하기 위해 아래와 같이 연락처를 운영합니다.\n담당: RKA Studio 고객센터\n이메일: ${about.contact.email}\n전화: ${about.contact.phone}`,
  },
];

function IntroEN() {
  return (
    <p className="font-body text-body">
      RedKiwiAde@STUDIO ("the Company") values the personal information of its users and complies with the Personal
      Information Protection Act and other applicable laws. Through this Privacy Policy, the Company explains the
      purposes and methods for which personal information provided by users is collected and used, and the measures
      taken to protect it.
    </p>
  );
}

function IntroKR() {
  return (
    <p className="font-body text-body">
      RedKiwiAde@STUDIO(이하 "회사")는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
      회사는 본 개인정보처리방침을 통해 이용자가 제공하는 개인정보가 어떠한 목적과 방식으로 수집·이용되고 있으며,
      개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex-grow px-page-margin py-section-gap flex flex-col gap-section-gap max-w-3xl">
      <header>
        <h1 className="font-page-title text-page-title">개인정보처리방침 / Privacy Policy</h1>
      </header>

      <section className="flex flex-col gap-section-gap">
        <h2 className="font-section-header text-section-header uppercase tracking-wider text-text-muted">English</h2>
        <IntroEN />
        {SECTIONS_EN.map((s) => (
          <div key={s.heading} className="flex flex-col gap-stack-gap">
            <h3 className="font-body-bold text-body">{s.heading}</h3>
            <p className="font-body text-body whitespace-pre-line">{s.body}</p>
          </div>
        ))}
        <p className="font-body text-body text-text-muted">Addendum: This Policy takes effect on August 3, 2026.</p>
      </section>

      <section className="flex flex-col gap-section-gap border-t border-border-subtle pt-section-gap">
        <h2 className="font-section-header text-section-header uppercase tracking-wider text-text-muted">한국어</h2>
        <IntroKR />
        {SECTIONS_KR.map((s) => (
          <div key={s.heading} className="flex flex-col gap-stack-gap">
            <h3 className="font-body-bold text-body">{s.heading}</h3>
            <p className="font-body text-body whitespace-pre-line">{s.body}</p>
          </div>
        ))}
        <p className="font-body text-body text-text-muted">부칙: 본 방침은 2026년 8월 3일부터 시행합니다.</p>
      </section>
    </div>
  );
}