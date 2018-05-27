export class Chat {
    
        public $key: "bot";
    
        constructor(
            public lastMessage: string,
            public timestamp: any,
            public title: string,
            public photo: string
        ) {}
    
    }