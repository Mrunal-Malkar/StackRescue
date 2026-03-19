type stackAttributeType = { label: ""; value: string };



export type StackCardType = {
  title: string;
  description: string;
  attributes: Array<stackAttributeType>;
};

export type ProjectStackType={
  title:string;
  description:string;
  buildProgress:{
    frontend:number;
    backend:number;
  },
  type:string;
  requiredSkills:string[];
  reasonForLeaving:string;
  toolsUsed:string[];
  image:string;
}

export type IdeaStackType={
  title:string;
  description:string;
  image:string;
  category:string;
  requiredSkills:string[];
}

export type InViewType="Posted"|"Collaborated"|"Completed"
