import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

const dialogflowURL = 'https://us-central1-chatbot-rektta.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-ui-component2',
  templateUrl: './ui-component2.page.html',
  styleUrls: ['./ui-component2.page.scss'],
})
export class UiComponent2Page implements OnInit {
  constructor(private http: HttpClient) { }

  messages = [];
  message;
  sending: boolean;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  sessionId = Math.random().toString(36).slice(-5);



  ngOnInit() {
    this.addBotMessage('Hello, my name is Johanna. How can I help you? ');
    this.addBotMessage('Type "HELP" to open Help Menu');
  }
  sendMessage(event) {
    const text = this.message;
    this.addUserMessage(text);
    this.message = ""
    this.http.post<any>(
      dialogflowURL,
      {
        sessionId: this.sessionId,
        queryInput: {
          text: {
            text,
            languageCode: 'en-US'
          }
        }
      }
    )
      .subscribe(res => {
        const { fulfillmentText } = res;
        this.addBotMessage(fulfillmentText);
      });
  }

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      date: new Date()
    });
    //this.content.scrollToBottom(200);
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      date: new Date()
    });
    // if(this.content.scrollX) {
    //   // this.content.scrollToBottom(200);
    // }
    //this.content.scrollToBottom(200);
  }

}
