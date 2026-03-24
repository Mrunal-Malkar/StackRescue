type stackAttributeType = { label: ""; value: string };


export type CloudinaryUploadResponse = {
  secure_url: string;
  public_id: string;
};


export type StackCardType = {
  title: string;
  description: string;
  attributes: Array<stackAttributeType>;
};

export type ProfileDataType={
  tools:string[],
  about:string,
  socialLink:string,
  image:string
}

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
