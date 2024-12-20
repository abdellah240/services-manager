function accept(notification, notificationDiv){
if(notification.message.paid == "1"){
  return;
}
else{
  const a = confirm("are you sure you want to cancel this ?")
  if(a){
    notificationDiv.style.display = "none";
    notificationDiv.remove();
  }
  else{return;}
}
}

function dismissNotification(notification, notificationDiv){
  const a = confirm("Are you sure? You won't be able to read it again if you dismiss. do you still want to delete this notification?");
  if(a){
    try{
      fetch("/delete-message1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notification.message), // Send the message ID to delete
      })
      .then(deleteResponse => deleteResponse.json())
      .then(deleteData => {
        if (deleteData.success) {
          // Remove the message element from the list
          notificationDiv.remove();
          notificationDiv.style.display = "none";
          location.reload();

        } else {
          alert("Failed to delete the message.");
        }
      })
      .catch(error => {
        console.error("Error deleting message:", error);
      });
      
    }
    catch(error){
      alert("an error occured");
    }
  }
  else{return;}
    
}

class Notification {
    constructor(Title, content, date) {
        this.Title = Title;
        this.content = content;
        this.date = date;
    }

    set change(newTitle){
      this._Title = newTitle;
    }
    
}

class Answer extends Notification{
    constructor(content, date,message){
        super("Answer from support :", content,date);
        this.message = message;
    }
}

class AlertBills extends Notification{
    constructor(content, date, message){
        super("New!", content,date);
        this.message = message;
    }
}

let notificationArr  = [];

function display(Notifications) {
  
  const container = document.getElementById("notifications-container"); // Assuming this is your target container
  container.innerHTML = ""; // Clear previous notifications

  if(Notifications.length === 0){
    const emptyMessage = document.createElement("h1");
    emptyMessage.textContent = "No more Notifications";
    emptyMessage.className = "empty-message";
    container.appendChild(emptyMessage);  // Append the message to the container
    return;
  }

  Notifications.forEach(notification => {
      // Create the notification container
      const notificationDiv = document.createElement("div");
      notificationDiv.className = "notification";

      // Add title
      const title = document.createElement("h2");
      title.textContent = notification.Title;
      notificationDiv.appendChild(title);

      // Add content
      const content = document.createElement("p");
      content.innerHTML = notification.content; // Use innerHTML for formatting support
      notificationDiv.appendChild(content);

      // Add date
      const date = document.createElement("small");
      date.className = "notification-date";
      date.textContent = `Date: ${new Date(notification.date).toLocaleString()}`;
      notificationDiv.appendChild(date);

      // Add actions based on notification type
      const actionsDiv = document.createElement("div");
      actionsDiv.className = "actions";

      if (notification instanceof AlertBills) {
          // Add "Accept" button for AlertBills
          
         console.log(notification.message.paid)
          if(notification.message.paid != "1"){
            const acceptButton = document.createElement("button");
            acceptButton.className = "dismiss";
            acceptButton.textContent = "Cancel this service";
            acceptButton.onclick = () => accept(notification,notificationDiv);
            actionsDiv.appendChild(acceptButton);}
          else{}
          
      } else if (notification instanceof Answer) { // Updated here
          // Add "Dismiss" button for Answer
          const dismissButton = document.createElement("button");
          dismissButton.className = "dismiss";
          dismissButton.textContent = "Mark as read and Dismiss";
          dismissButton.onclick = () => dismissNotification(notification, notificationDiv);
          actionsDiv.appendChild(dismissButton);
      }

      notificationDiv.appendChild(actionsDiv);
      container.appendChild(notificationDiv);
  });
}

  

  async function loadNotifications(targetID) {
    try {
      const response = await fetch("/Answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { Answers } = await response.json();
  
      // Validate Answers
      if (!Answers || !Array.isArray(Answers)) {
        throw new Error("Invalid `Answers` data.");
      }
  
      // Filter by targetID
      const matchingAnswers = Answers.filter(answer => String(answer.ID) === String(targetID));  
      // Populate `notificationArr` with matching answers
      matchingAnswers.forEach(match => {
        console.log(notificationArr);
        if (match && match.message && match.timestamp) {
          notificationArr.push(new Answer(match.message, match.timestamp,match));
        }
      });

      const response2 = await fetch('/api/checkout', { method: 'GET' });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const confirmation = await response2.json();
      const Data = confirmation.result;
      console.log(Data);
      const MatchingData = Data.filter(data => String(data.client_id) === String(targetID));
      MatchingData.forEach(match => {
        console.log(notificationArr);
        if (match && match.client_id) {
          if(match.paid != "1"){
        notificationArr.push(new AlertBills(`A request has been sent for the following service : <b> ${match.title} </b>`,  match.date, match));}
      else{
        notificationArr.push(new AlertBills(`The following service has been confirmed : <b> ${match.title} </b>`,  match.date, match));
      }
        }
      });  
      // Update UI
      display(notificationArr);
  
    } catch (error) {
      console.error("Error loading messages:", error);
      alert("Error loading messages. Please try again.");
    }
  }
