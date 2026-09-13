// 자동 생성: scripts/gen-hub-index.mjs — 직접 수정하지 말 것 (원본 scripts/title-system/hub.basic-pension.json)
import type { HubData } from "./types";

export const HUB: HubData = {
  "slug": "basic-pension",
  "route": "/basic-pension/",
  "keyword": "기초연금",
  "title": "기초연금 수급자격과 금액, 국민연금 감액과 부부감액까지",
  "h1": "기초연금, 무엇이 궁금하세요?",
  "description": "기초연금 수급자격과 선정기준액, 소득인정액 계산, 국민연금 감액과 부부감액, 신청 방법까지 한 페이지에 모았어요. 검색하거나 묶음에서 바로 찾아요.",
  "guide": {
    "href": "/basic-pension/guide/",
    "title": "2026년 기초연금 수급 조건과 금액, 선정기준액부터 신청까지",
    "description": "65세 이상이고 소득인정액이 단독가구 2,470,000원 이하면 기초연금을 받아요. 단독가구는 월 349,700원, 부부가구는 559,520원이에요. 선정기준액, 소득인정액, 국민연금 연계 감액, 신청 방법을 정리했어요."
  },
  "calculator": {
    "route": "/basic-pension/calculator/"
  },
  "popular": [
    {
      "term": "기초연금 수급자격",
      "href": "/basic-pension/guide/"
    },
    {
      "term": "기초연금 선정기준액",
      "href": "/basic-pension/guide/"
    },
    {
      "term": "기초연금 계산기",
      "href": "/basic-pension/calculator/"
    },
    {
      "term": "기초연금 국민연금 감액",
      "href": "/basic-pension/national-pension/"
    },
    {
      "term": "기초연금 감액 기준",
      "href": "/basic-pension/national-pension/"
    },
    {
      "term": "기초연금 부부감액",
      "href": "/basic-pension/couple/"
    },
    {
      "term": "기초연금 부부 수령액",
      "href": "/basic-pension/couple/"
    },
    {
      "term": "기초연금 신청방법",
      "href": "/basic-pension/guide/"
    }
  ],
  "groups": [
    {
      "key": "A",
      "name": "수급자격과 신청",
      "intro": "만 65세 이상이고 소득인정액이 선정기준액 이하면 받아요. 2026년 선정기준액은 단독가구 2,470,000원, 부부가구 3,952,000원이에요. 소득인정액 계산과 신청 방법을 봐요.",
      "spokes": [
        {
          "href": "/basic-pension/guide/",
          "title": "2026년 기초연금 수급 조건과 금액, 선정기준액부터 신청까지",
          "description": "65세 이상이고 소득인정액이 단독가구 2,470,000원 이하면 기초연금을 받아요. 단독가구는 월 349,700원, 부부가구는 559,520원이에요. 선정기준액, 소득인정액, 국민연금 연계 감액, 신청 방법을 정리했어요."
        }
      ]
    },
    {
      "key": "B",
      "name": "국민연금 감액",
      "intro": "국민연금이 기준연금액의 150%인 524,550원 이하면 기초연금을 다 받아요. 넘으면 국민연금액과 소득재분배 부분에 따라 줄고, 부가연금액 174,850원은 남아요.",
      "spokes": [
        {
          "href": "/basic-pension/national-pension/",
          "title": "기초연금 국민연금 감액 기준, 국민연금 받으면 얼마나 깎이나요",
          "description": "국민연금이 기준연금액의 150%인 524,550원 이하면 기초연금을 다 받아요. 넘어도 국민연금 중 소득재분배 부분이 작으면 전액이고, 크면 줄지만 부가연금액은 남아요. 150%와 200% 사이 계산법과 조기·분할연금 기준을 정리했어요."
        }
      ]
    },
    {
      "key": "C",
      "name": "부부감액",
      "intro": "부부가 둘 다 받으면 각자 20%씩 깎여 둘이 합쳐 559,520원이에요. 한 명만 받으면 감액이 없고, 소득인정액이 선정기준액에 가까우면 따로 더 줄어요.",
      "spokes": [
        {
          "href": "/basic-pension/couple/",
          "title": "기초연금 부부감액, 부부 수령액은 각자 얼마인가요",
          "description": "부부가 둘 다 기초연금을 받으면 각자 20%씩 깎여 감액이 없을 때 둘이 합쳐 559,520원이에요. 한 명만 받으면 20% 감액은 없어요. 국민연금 감액이 있을 때 부부 수령액과 선정기준액 근처에서 둘이 나눠 받는 방법을 정리했어요."
        }
      ]
    }
  ]
};
