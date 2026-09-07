import type { TrackKey } from "./taxonomy";

export const trackMeta: Record<TrackKey, { label: string; href: string }> = {
  understand: { label: "认识 ADHD", href: "/science" },
  assessment: { label: "评估与诊断", href: "/practice" },
  treatment: { label: "治疗", href: "/treatment" },
  life: { label: "生活", href: "/life" },
};

export const keywordMap: Record<TrackKey, string[]> = {
  understand: ["神经", "机制", "科普", "误区", "基础", "定义", "特质", "症状"],
  assessment: ["评估", "诊断", "筛查", "dsm", "icd", "就医", "鉴别", "报告"],
  treatment: ["药物", "治疗", "干预", "认知行为", "cbt", "疗法", "副作用", "剂量", "循证"],
  life: ["时间管理", "沟通", "关系", "反思", "节奏", "习惯", "睡眠", "职场", "生活", "复盘"],
};

export const trackPriority: TrackKey[] = ["assessment", "treatment", "life", "understand"];
