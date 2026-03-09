import { IconType } from 'react-icons';

export type SkillCategory = 'technical' | 'tools' | 'soft';

export type Skill = {
  name: string;
  icon?: IconType;
  color?: string;
  category: SkillCategory;
};
