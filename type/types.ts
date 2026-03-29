import { InferSchemaType } from "mongoose";
import Project from "@/lib/schemaProjects";
import Idea from "@/lib/schemaIdeas";

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


export interface ProfileFormInputs {
  about: string;
  link: string;
  image: FileList;
  tools: string[]; // exactly 3 tools
}

export type requestType={
  _id:string,
  requestedBy:{
    _id:string,
    profileImage:string,
    email:string,
    name:string,
  },
  to:{
    _id:string,
    profileImage:string,
    email:string,
    name:string,
  },
  stackId:string ,
  stackType:"Idea"|"Project",
}

export type RequestStackType={
  stackId:string,
  stackType:string,
}

export type CollaborateType={
    requestedBy:{
    _id:string,
    profileImage:string,
    email:string,
    name:string,
    status:"pending"|"rejected"|"accepted"
  },
  stackId:{
    _id:string,
    title:string,
  },
  stackType:"Project"|"Idea",
}

export type ProfileData = {
  profileImage:string,
  about: string;
  socialLink: string;
  tools: string[];
  totalCollaborations: number;
  createdTotal: number;
  projects: {
    created: ProjectStackType[];
  };
  ideas: {
    created: IdeaStackType[];
  };
  requests:requestType[];
  collaborated:CollaborateType[];
};

export type ProjectStackType=InferSchemaType<typeof Project> & {
  createdAt:Date,
  updatedAt:Date,
}

export type IdeaStackType=InferSchemaType<typeof Idea> & {
  createdAt:Date,
  updatedAt:Date,
}

export type BaseStack = {
  _id:string
  title: string;
  description: string;
  tools:string[],
  createdAt: Date;
};

export type sortedAllStackType=(IdeaStackType | ProjectStackType )

export type InViewType="Posted"|"Collaborated"|"All"


type BaseStackForBoth = {
  _id: string;
  title: string;
  description: string;

  image?: {
    secure_url?: string;
    public_id?: string;
  };

  categories: string[];
  roles: string[];
  requiredSkills: string[];

  createdBy: string;
  collaborators: string[];

  createdAt: string;
  updatedAt: string;
};

export type ProjectType = BaseStackForBoth & {
  type: "Project";

  buildProgress: {
    uiux: number;
    backend: number;
  };

  projectType: string;
  reasonForLeavingProject: string;

  toolsUsed: string[];

  liveLink: string;
  repoLink: string;
};

export type IdeaType = BaseStackForBoth & {
  type: "Idea";
};

export type GeneralStackType = ProjectType | IdeaType;

export type AuthorType={
  name:string,
  email:string,
  about:string,
  profileImage:string,
}

export type UnifiedStack = GeneralStackType & {
  stackType?: "Project" | "Idea";
};