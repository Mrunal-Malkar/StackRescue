type stackAttributeType = { label: string; value: string };

export type StackCardType = {
  title: string;
  description: string;
  attributes: Array<stackAttributeType>;
};

export type InViewType="Posted"|"Collaborated"|"Completed"