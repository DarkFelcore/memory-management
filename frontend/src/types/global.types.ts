export interface ICompany {
    id: number;
    name: string;
    size: string;
    createdAt: string;
}

export interface ICreateCompany {
    name: string;
    size: string;
}

export interface IJob {
    id: number;
    title: string;
    level: string;
    companyId: number;
    comanyName: string;
    createdAt: string;
}

export interface ICreateJob {
    title: string;
    level: string;
    companyId: string;
}

export interface ICandidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    resumeUrl: string;
    jobId: string;
    jobTitle: string;
}

export interface ICreateCandidate {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    coverLetter: string;
    jobId: string;
}