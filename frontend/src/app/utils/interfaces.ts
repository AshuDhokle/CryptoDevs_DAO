export interface IProposal {
    proposalId: number;
    nftTokenId: number;
    deadline: number;
    yay: number;
    nay: number;
    executed: boolean;
}