import React from 'react';
import { about } from '../data/data';

const COMPANY_INFO = {
  name: 'RedKiwiAde@STUDIO (레드키위에이드스튜디오)',
  nameEn: 'RedKiwiAde@STUDIO',
  rep: '정흥문',
  repEn: 'HongMoon Jeong',
  bizNo: '603-14-78395',
};

const ARTICLES_KR = [
  {
    heading: '제1조 (목적 및 정의)',
    body: `본 약관은 RedKiwiAde@STUDIO(이하 "회사")가 운영하는 웹사이트 redkiwiade.com(이하 "웹사이트")을 통해 회사가 제공하는 가구, 문구/데스크 오브젝트 판매 및 프로젝트 포트폴리오 소개 서비스(이하 "서비스")의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다. 본 웹사이트는 별도의 회원가입 절차 없이 누구나 서비스를 이용할 수 있습니다.`,
  },
  {
    heading: '제2조 (계정 및 보안)',
    body: `① 본 서비스는 현재 회원가입 및 로그인 기능을 제공하지 않으며, 이용자는 주문 시 필요한 정보를 직접 입력하여 서비스를 이용합니다.\n② 이용자는 주문 시 입력하는 배송지, 연락처 등 정보의 정확성에 대한 책임을 지며, 정보 오기재로 인해 발생하는 불이익에 대해 회사는 책임을 지지 않습니다.\n③ 향후 회원가입 기능이 도입될 경우 본 조항은 별도 고지 후 개정될 수 있습니다.`,
  },
  {
    heading: '제3조 (지식재산권 및 소유권)',
    body: `웹사이트에 게시된 디자인, 로고, 프로젝트 이미지, 상품 사진, 콘텐츠 및 소프트웨어에 대한 저작권 및 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 사전 서면 동의 없이 이를 복제, 전송, 배포, 출판 등의 방법으로 이용하거나 제3자에게 이용하게 할 수 없습니다.`,
  },
  {
    heading: '제4조 (이용자의 의무 및 금지행위)',
    body: `이용자는 다음 각 호의 행위를 하여서는 안 됩니다.\n1. 타인의 정보를 도용하여 허위로 주문하는 행위\n2. 웹사이트의 정상적인 운영을 방해하거나 시스템에 무단으로 접근·침입하는 행위\n3. 웹사이트에 게시된 콘텐츠를 무단으로 복제, 배포하는 행위\n4. 기타 관계 법령에 위반되는 행위\n회사는 이용자가 위 각 호를 위반하는 경우 주문 취소, 서비스 이용 제한 등의 조치를 취할 수 있습니다.`,
  },
  {
    heading: '제5조 (면책조항)',
    body: `① 회사는 서버 점검, 시스템 장애, 통신 장애, 천재지변 등 회사의 통제범위를 벗어난 사유로 서비스를 제공할 수 없는 경우 이에 대한 책임을 지지 않습니다.\n② 회사는 웹사이트에 링크된 제3자 서비스(PayPal 등 결제 서비스 포함)에서 발생한 문제에 대해 책임을 지지 않으며, 해당 서비스의 이용약관 및 정책은 각 제3자가 별도로 정합니다.`,
  },
  {
    heading: '제6조 (결제 및 환불 규정)',
    body: `① 상품 결제는 PayPal을 통해서만 가능합니다.\n② 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라 상품 수령일로부터 7일 이내에 청약철회(환불)를 요청할 수 있습니다.\n③ 단순 변심에 의한 반품의 경우 왕복 배송비는 이용자가 부담합니다.\n④ 상품을 사용하였거나 상품의 가치가 훼손된 경우, 시간 경과로 재판매가 곤란할 정도로 가치가 현저히 감소한 경우에는 청약철회가 제한될 수 있습니다.\n⑤ 환불 요청은 이메일(${about.contact.email})로 접수하며, 확인 후 관련 법령에 따라 처리합니다.`,
  },
  {
    heading: '제7조 (분쟁해결 및 관할법원)',
    body: `본 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 서비스 이용과 관련하여 회사와 이용자 간 분쟁이 발생한 경우 민사소송법상의 관할법원에 소를 제기합니다.`,
  },
];

const ARTICLES_EN = [
  {
    heading: 'Article 1 (Purpose and Definitions)',
    body: `These Terms govern the conditions and procedures for using the services provided by RedKiwiAde@STUDIO ("the Company") through its website, redkiwiade.com ("the Website"), including the sale of furniture, stationery/desk objects, and the presentation of the Company's project portfolio ("the Service"), as well as the rights, obligations, and responsibilities of the Company and users. The Website may be used by anyone without a separate account registration process.`,
  },
  {
    heading: 'Article 2 (Account and Security)',
    body: `1. The Service currently does not provide account registration or login functionality; users provide the information required at the time of ordering directly.\n2. Users are responsible for the accuracy of information such as shipping address and contact details entered when placing an order, and the Company is not liable for any disadvantage arising from incorrect information.\n3. Should account registration be introduced in the future, this article may be revised following separate notice.`,
  },
  {
    heading: 'Article 3 (Intellectual Property)',
    body: `Copyright and other intellectual property rights in the design, logo, project images, product photographs, content, and software published on the Website belong to the Company. Users may not reproduce, transmit, distribute, publish, or otherwise use such materials, or allow third parties to do so, without the Company's prior written consent.`,
  },
  {
    heading: 'Article 4 (User Obligations and Prohibited Conduct)',
    body: `Users shall not engage in any of the following:\n1. Placing false orders using another person's information\n2. Interfering with the normal operation of the Website or gaining unauthorized access to its systems\n3. Reproducing or distributing content published on the Website without authorization\n4. Any other act that violates applicable laws\nThe Company may cancel orders or restrict use of the Service if a user violates any of the above.`,
  },
  {
    heading: 'Article 5 (Limitation of Liability)',
    body: `1. The Company is not liable for any failure to provide the Service due to server maintenance, system failure, communication failure, force majeure, or other causes beyond the Company's control.\n2. The Company is not responsible for issues arising from third-party services linked from the Website, including payment services such as PayPal; the terms and policies of such third-party services are set separately by each provider.`,
  },
  {
    heading: 'Article 6 (Payment and Refunds)',
    body: `1. Payment for products may only be made through PayPal.\n2. In accordance with the Act on Consumer Protection in Electronic Commerce, users may request withdrawal of an order (refund) within 7 days of receiving the product.\n3. For returns due to simple change of mind, round-trip shipping costs are borne by the user.\n4. The right of withdrawal may be limited if the product has been used, its value has been damaged, or its value has diminished significantly over time such that resale is impracticable.\n5. Refund requests are accepted by email (${about.contact.email}) and processed in accordance with applicable law upon confirmation.`,
  },
  {
    heading: 'Article 7 (Dispute Resolution and Jurisdiction)',
    body: `These Terms are governed by and construed in accordance with the laws of the Republic of Korea. Any dispute between the Company and a user arising from use of the Service shall be brought before a court of competent jurisdiction under the Civil Procedure Act.`,
  },
];

function CompanyBlockKR() {
  return (
    <div className="flex flex-col gap-1 font-body text-body text-text-muted">
      <p>부칙: 본 약관은 2026년 8월 12일부터 시행합니다.</p>
      <p className="mt-stack-gap">
        상호: {COMPANY_INFO.name}<br />
        대표자: {COMPANY_INFO.rep}<br />
        사업자등록번호: {COMPANY_INFO.bizNo}<br />
        사업장 소재지: {about.address.join(' ')}<br />
        이메일: {about.contact.email}<br />
        전화: {about.contact.phone}
      </p>
    </div>
  );
}

function CompanyBlockEN() {
  return (
    <div className="flex flex-col gap-1 font-body text-body text-text-muted">
      <p>Addendum: These Terms take effect on August 12, 2026.</p>
      <p className="mt-stack-gap">
        Company: {COMPANY_INFO.nameEn}<br />
        Representative: {COMPANY_INFO.repEn}<br />
        Business Registration No.: {COMPANY_INFO.bizNo}<br />
        Address: {about.address.join(', ')}<br />
        Email: {about.contact.email}<br />
        Phone: {about.contact.phone}
      </p>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="flex-grow px-page-margin py-section-gap flex flex-col gap-section-gap max-w-3xl">
      <header>
        <h1 className="font-page-title text-page-title">이용약관 / Terms of Service</h1>
      </header>

      <section className="flex flex-col gap-section-gap">
        <h2 className="font-section-header text-section-header uppercase tracking-wider text-text-muted">English</h2>
        {ARTICLES_EN.map((a) => (
          <div key={a.heading} className="flex flex-col gap-stack-gap">
            <h3 className="font-body-bold text-body">{a.heading}</h3>
            <p className="font-body text-body whitespace-pre-line">{a.body}</p>
          </div>
        ))}
        <CompanyBlockEN />
      </section>

      <section className="flex flex-col gap-section-gap border-t border-border-subtle pt-section-gap">
        <h2 className="font-section-header text-section-header uppercase tracking-wider text-text-muted">한국어</h2>
        {ARTICLES_KR.map((a) => (
          <div key={a.heading} className="flex flex-col gap-stack-gap">
            <h3 className="font-body-bold text-body">{a.heading}</h3>
            <p className="font-body text-body whitespace-pre-line">{a.body}</p>
          </div>
        ))}
        <CompanyBlockKR />
      </section>
    </div>
  );
}