import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import { LoadingController} from 'ionic-angular';
import { AuthServiceProvider} from '../auth-service/auth-service';

@Injectable()
export class RestProvider {
  private API_URL = 'http://18.231.115.98:81/api/'

  Loading : any;
  Header : any;
  HeaderOptions: RequestOptions;

  constructor(
    public http: Http,
    private auth: AuthServiceProvider,
    private loadingCtrl: LoadingController,
  ) {
    this.headerHandling();
   }

   headerHandling() {
    this.Header = new Headers({ 
      'Content-Type': 'application/json', 
      'Accept': 'q=0.8;application/json;q=0.9',
      'Authorization': "Bearer "+this.auth.getUser().token
    });
    this.HeaderOptions = new RequestOptions(this.Header);
  }

   public LoadingStart(message="Carregando") {
    if (!this.Loading) {
      this.Loading = this.loadingCtrl.create({
        content: message
      });
    }
    this.Loading.present();
  }

  public LoadingEnd(){
    if(this.Loading){
      this.Loading.dismiss();
    }
    this.Loading = null;
  }

  register(username: string, email: string, password: string) {
    let self = this;
    this.LoadingStart('Efetuando cadastro');
    return new Promise((resolve, reject) => {
      var data = {
        username: username,
        email: email,
        password: password
      };
      this.http.post(this.API_URL + 'auth/register', data)
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          this.auth.store( result.json()  );
          console.log( result.json() );
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  login(data: any) {
    let self = this;
    self.LoadingStart('Efetuando login');
    self.LoadingEnd();
    this.auth.store({'lorem':"ipsum"});
  }

  invite(username: string) {

  }

  active(code: string) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Verificando código');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'active?code='+code, { headers:  self.Header  })
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          self.me();
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  me() {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando dados');
    self.LoadingEnd();
    this.auth.store({'lorem':"ipsum"});
    return {'lorem':"ipsum"};
  }

  getAllLearning() {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando módulos');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'learning', { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  listQuestions(id) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando exercícios');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'learning/questions/'+id, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getQuestion(id: number) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando exercício');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'learning/question/'+id, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  getUserInfo() {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'user/coins', { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  createAnswer(param: object) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Revisando..');
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'learning',param, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  listProducts(type) {
    let self = this;
    let URL = this.API_URL + 'products?type='+type;
    self.headerHandling();
    self.LoadingStart('Carregando Criptos');
    return new Promise((resolve, reject) => {
      this.http.get(URL,{ headers:self.Header})
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  listProduct(id) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando Cripto');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'products/'+id, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  listRanking() {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Carregando Ranking');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'user/ranking', { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  buyProduct(id) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Comprando');
    return new Promise((resolve, reject) => {
      this.http.post(this.API_URL + 'products',{product:id}, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  checkParam(column,value) {
    let self = this;
    console.log(column,value);
    self.LoadingStart('Verificando...');
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + 'check?column='+column+'&value='+value)
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

  subScription(plan,token,document) {
    let self = this;
    self.headerHandling();
    self.LoadingStart('Criando assinatura');
    return new Promise((resolve, reject) => {
      var data = {
        plan: plan,
        token: token,
        document: document,
      };
      this.http.post(this.API_URL + 'subscription', data, { headers:  self.Header  } )
        .finally( () => self.LoadingEnd())
        .subscribe((result: any) => {
          self.me();
          resolve(result.json());
        },
        (error) => {
          reject(error.json());
        });
    });
  }

}