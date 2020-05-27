import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UiComponent2Page } from '../ui-component2/ui-component2.page';
import { TestPage } from '../test/test.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  async openChatbot(){
    this.router.navigateByUrl('chat');
  }
}
