// 자동 생성: scripts/gen-hub-index.mjs — 직접 수정하지 말 것 (원본 scripts/title-system/hub.transfer-tax.json)
import type { HubData } from "./types";

export const HUB: HubData = {
  "slug": "transfer-tax",
  "route": "/transfer-tax/",
  "keyword": "양도세",
  "title": "양도세 계산과 비과세, 필요경비와 장기보유특별공제까지",
  "h1": "양도세, 무엇이 궁금하세요?",
  "description": "1주택 양도세 비과세 요건, 12억 초과분 계산, 필요경비 인정 항목, 장기보유특별공제율과 신고 기한까지 한 페이지에 모았어요. 검색하거나 묶음에서 바로 찾아요.",
  "guide": {
    "href": "/transfer-tax/guide/",
    "title": "1주택 양도세 비과세 요건과 계산, 2년 보유부터 12억 초과분까지",
    "description": "2년 이상 보유한 1주택을 12억원 이하로 팔면 양도세가 없어요. 15억원에 팔면 초과분에만 세금이 붙어 2,821,500원이에요. 비과세 요건, 12억 초과분 계산, 장기보유특별공제, 신고 기한을 정리했어요."
  },
  "calculator": {
    "route": "/transfer-tax/calculator/"
  },
  "popular": [
    {
      "term": "양도세 비과세 조건",
      "href": "/transfer-tax/guide/"
    },
    {
      "term": "양도세 12억 초과분",
      "href": "/transfer-tax/guide/"
    },
    {
      "term": "양도세 계산기",
      "href": "/transfer-tax/calculator/"
    },
    {
      "term": "양도세 필요경비 인정 항목",
      "href": "/transfer-tax/expense/"
    },
    {
      "term": "양도세 필요경비 취득세",
      "href": "/transfer-tax/expense/"
    },
    {
      "term": "양도세 장기보유특별공제율",
      "href": "/transfer-tax/long-term-deduction/"
    },
    {
      "term": "양도세 장기보유특별공제 2주택",
      "href": "/transfer-tax/long-term-deduction/"
    },
    {
      "term": "양도세 예정신고 기한",
      "href": "/transfer-tax/guide/"
    }
  ],
  "groups": [
    {
      "key": "A",
      "name": "비과세와 계산",
      "intro": "1세대가 1주택을 2년 이상 보유하고 12억원 이하로 팔면 양도세가 없어요. 살 때 조정대상지역이었다면 거주 2년도 필요해요. 12억원을 넘기면 넘는 비율만큼만 과세하고, 신고는 판 달의 말일부터 2개월 안에 해요.",
      "spokes": [
        {
          "href": "/transfer-tax/guide/",
          "title": "1주택 양도세 비과세 요건과 계산, 2년 보유부터 12억 초과분까지",
          "description": "2년 이상 보유한 1주택을 12억원 이하로 팔면 양도세가 없어요. 15억원에 팔면 초과분에만 세금이 붙어 2,821,500원이에요. 비과세 요건, 12억 초과분 계산, 장기보유특별공제, 신고 기한을 정리했어요."
        }
      ]
    },
    {
      "key": "B",
      "name": "필요경비",
      "intro": "판 금액에서 빼 주는 비용은 취득가액, 자본적 지출액, 양도비 세 가지예요. 취득세와 중개수수료가 어디에 들어가는지, 증빙은 무엇을 남기는지 봐요.",
      "spokes": [
        {
          "href": "/transfer-tax/expense/",
          "title": "양도세 필요경비 인정 항목, 취득세와 중개수수료도 되나요",
          "description": "양도세 필요경비는 취득가액, 자본적 지출액, 양도비 세 갈래만 인정돼요. 취득세는 취득가액에, 팔 때 낸 중개수수료는 양도비에 들어가요. 2년 이상 보유한 1주택을 12억원 이하로 팔면 세금이 0원이고, 5억원에 판 2주택이면 1,000만원이 세금을 3,762,000원 줄여요."
        }
      ]
    },
    {
      "key": "C",
      "name": "장기보유특별공제",
      "intro": "1주택은 보유 3년·거주 2년을 넘기면 최대 80%, 그 밖에는 최대 30%까지 양도차익에서 빼 줘요. 조정대상지역 2주택 중과 대상은 받지 못해요.",
      "spokes": [
        {
          "href": "/transfer-tax/long-term-deduction/",
          "title": "양도세 장기보유특별공제율 표, 2주택도 받나요",
          "description": "1주택은 보유 3년 이상에 거주 2년 이상이면 보유와 거주 공제율을 더해 최대 80%까지 받아요. 거주가 모자라거나 2주택이면 일반 공제율로 최대 30%이고, 조정대상지역 2주택 중과 대상이면 공제가 없어요. 연수별 공제율 표와 중과 제외 기한을 정리했어요."
        }
      ]
    }
  ]
};
