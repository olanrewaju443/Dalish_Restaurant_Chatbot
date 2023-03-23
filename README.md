# Dalish_Restaurant_Chatbot
This is a chatbot for a restaurant that allows users to place an order order of their preferred meals, cancel order, check their order history(current or old), and saves their session. 

### Live Site

---

-   [Chat Bot](https://dalish-chatbot.onrender.com/)


### Dependencies

---

-   Node.js
-   Express.js
-   Conect-MongoDB-session
-   Socket.IO
-   Express-Session
-   Winston.js  

### User Documentation

---
#### The following are the features of the restaurant chatbot:
-   Place an Order: Users can place an order food by entering the corresponding number of the item they want from the menu.
-   Cancel order: Users can cancel their order by entering 0 and it cancels their current order cart
-   Check order history: Users can check their current or old order history by entering the corresponding number.
- Save session: The chatbot saves the user's session and chat history, so they can resume their order or check their history at any time.



### Getting Started

Users initiate a chat session with the bot by visiting this [URL](https://dalish-chatbot.onrender.com) or setting up a local server as instructed in the [setup section](#setup) of this documentation.  
Upon connection, for first-time users the chatbot will ask to input username while for returning users it proceeds to a welcome message and a list of available options.


---
### **Menu Options:**
To select an option, the user simply needs to type in the corresponding number and press the "send" button. The chatbot will then respond with further instructions or information depending on the user's selection.
For example:

- Select 1 to Place an order
   - select 1: pizza #1700
     - how many pizza? [1 to 9]
       > pizza added to order
     - select 0 to cancel
   - select 2: Chips #900
   - ....
   - select 0: cancel
   - select 99: more items
- Select 99 to checkout order
- Select 98 to see order history
- Select 97 to see current order
- Select 0 to cancel order

**Placing an Order**   
When the user selects option 1 from the main menu, they will be prompted to select an item from the menu. The menu consists of a list of available items, each of which is assigned a unique ID. The user must input the ID of the item they wish to order and then futher select how many of that item should be added.

**Checkout Order**   
When the user selects option 99 from the main menu, the chatbot will check if there are any items in the current order. If there are, the current order will be cleared and added to the order history. If there are no items in the current order, the chatbot will inform the user that there are no items in the current order.

**View Order History**  
When the user selects option 98 from the main menu, the chatbot will display a list of all previous orders, each of which will be identified by an order number.

**View Current Order**  
When the user selects option 97 from the main menu, the chatbot will display a list of items in the current order.

**Cancel Order**  
When the user selects option 0 from the main menu, the chatbot will clear the current order



### **Error Handling:**
The chatbot has been designed to handle errors gracefully and provide helpful feedback to users when they make mistakes. If a user types in an invalid option or enters an incorrect format, the chatbot will respond with an `Invalid Input` and then present the available options again.

### **Conclusion:**
The Restaurant Chatbot is a useful tool that can save time, cost and improve customers satisfaction.  
By presenting a menu of options and allowing users to select their desired option using numbers, the chatbot makes it easy for users to navigate through a series of options and find the information they need.

---

1. Clone the repository:
    - `https://github.com/olanrewaju443/Dalish_Restaurant_Chatbot.git`
2. Install all  dependencies:
    - `npm install`
3. Create a .env file in the root directory using the sample.env file as a guide 

4. Start the application:
    - `npm run dev`
5. Open the application in your browser:
    - `http://localhost:3000`

### Usage

---

To use the restaurant chatbot, follow these steps:

-   Visit the chatbot site [Chat Bot](https://chatbot-zznn.onrender.com/) on your device

### System Architecture

The system architecture of the chatbot can be divided into two main components:

1. Server-side
2. Client-side

### Server-Side
The server-side component of the chatbot is responsible for handling incoming requests from the client and processing them. It is built using Node.js and Express.js and uses Socket.io for real-time communication with the client.


### Schedules
  The server-side component consists of the following modules:
  - server.js - This is the main server file that initializes the Express.js server and sets up the Socket.io connection   
  - navigationTree.js - This module implements the tree data structure that is used to keep track of the user's previous inputs.
  - botResponse.js - handles calling methods, emiting message to front end
  - response-methods - This module holds the various method attached to the nodes on the tree data structure  
  - Session-Data - This Implement creation and managemen of chat session data including the tree, orders etc 

### Client-Side
  - index.html - This is the HTML file for the chat interface. it contains the CSS and JS (to keep project simple)


### Caution

---

The Restaurant Chat-botis not intended for production use yet. Use at your own risk.
