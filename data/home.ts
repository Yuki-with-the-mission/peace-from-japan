import type { HomeData } from "./types";

export const homeData: HomeData = {
  snapshotUpdated: "2025-08-13",
  snapshot: [
    {
      kind: "fact",
      text: "ガザ・アル・シファ病院付近で報道用テントが攻撃され記者4名死亡（2025-08-10）。",
      date: "2025-08-10",
      source: "BBC / Reuters",
      url: "https://example.com/article1"
    },
    {
      kind: "fact",
      text: "IDFは標的が武装組織指導者だったと主張、独立検証は未了。",
      source: "Reuters",
      url: "https://example.com/article2"
    },
    {
      kind: "opinion",
      text: "記者標的化は国際人道法の原則に反し、情報隠蔽リスクが高い。",
      source: "編集部見解"
    }
  ],
  reactions: [
    {
      region: "欧米",
      text: "報道自由・人道法の観点で非難声明が継続。安保理では合意難航（米の拒否権等）。"
    },
    {
      region: "中東/グローバルサウス",
      text: "即時停戦要求とICC活用の声。"
    }
  ]
};
