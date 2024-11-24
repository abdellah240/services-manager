function acceptPayment(){
}

function dismissNotification(){
    
}

class Notification {
    constructor(Title, content, date) {
        this.Title = Title;
        this.content = content;
        this.date = date;
    }
}

class Answers extends Notification{
    constructor(content, date){
        super("Answer from support", content,date);
    }
}