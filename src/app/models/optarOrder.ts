export interface OptarOrder {
    id: number;
    fileId: number;
    naturalKey: string;
    reviewResult: string;
    reviewMessages: string[];
    // <TODO>
    // Mockups are just one string (the line of the file):
    transmittal: string;
    // Or the order details can be split if more control is needed:
    niin: string;
    fiscalYear: number;
    tlUnitPrice: number;
    niinUnitPrice: number;
    //etc...
    // </TODO>
}
