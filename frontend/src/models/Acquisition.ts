class Acquisition {
    id: number = 0;
    expeditionId: number | null = null;
    adventurerId: number | null = null;
    name:string = "";
    date: Date = new Date();
    sold: boolean = false;
    price: number | null = null;
    constructor() {
    }

}

export default Acquisition;