"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const data = __importStar(require("./shopzone_libary"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(__dirname + '/../public'));
app.listen(port, () => {
    console.log('*****Server gestartet*****');
    console.log(`Erreichbar unter http://localhost:${port}`);
});
const ngrok_1 = __importDefault(require("ngrok"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        const url = yield ngrok_1.default.connect({
            authtoken: '2ibugo9AhJGseTWqDatcIq92Su2_82Z4FsJtcfx9aH3uhkTU',
            addr: port
        });
        console.log('*****ngrok URL*****');
        console.log(url);
    });
})();
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, __dirname + '/../uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.use('/uploads', express_1.default.static(__dirname + '../uploads'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
let users = [];
let offers = [];
function readOffers() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(__dirname + '/../data/newOffer.json', 'utf-8');
        offers = JSON.parse(data);
    });
}
function readUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield promises_1.default.readFile(__dirname + '/../data/users.json', 'utf-8');
        users = JSON.parse(data);
    });
}
readUsers();
readOffers();
app.get('/get-offer', (_req, res) => {
    let answer_json = {
        'result': data.allOffers
    };
    res.send(answer_json);
});
app.post('/add-offer', upload.single('image'), (req, res) => {
    let offer_name = req.body.name;
    let offer_description = req.body.description;
    let offer_price = req.body.price;
    let image_filename = req.file ? req.file.filename : '';
    let image_path = path_1.default.join('/uploads', image_filename);
    let new_Offer = {
        "name": offer_name,
        "description": offer_description,
        "price": offer_price,
        "image": image_path
    };
    offers.push(new_Offer);
    try {
        promises_1.default.writeFile(__dirname + '/../data/newOffer.json', JSON.stringify(offers, null, 2), 'utf-8');
        console.log('New Offer added');
        let answer_json = { 'success': true };
        res.send(answer_json);
    }
    catch (error) {
        let answer_json = { 'success': false };
        res.send(answer_json);
    }
});
app.post('/auth-user', (req, res) => {
    let uname = req.body.username;
    let upassword = req.body.password;
    let answer = {
        sucess: false
    };
    for (let i = 0; i < users.length; i++) {
        let trueUserName = users[i].username;
        let trueUserPassword = users[i].password;
        if (uname === trueUserName && upassword === trueUserPassword) {
            answer = {
                sucess: true
            };
        }
    }
    res.json(answer);
});
app.post('/register-user', (req, res) => {
    let username = req.body.username;
    let userPassword = req.body.password;
    let useremail = req.body.email;
    let userphone = req.body.phone;
    let new_User = {
        "username": username,
        "password": userPassword,
        "email": useremail,
        "phone": userphone
    };
    users.push(new_User);
    try {
        promises_1.default.writeFile(__dirname + '/../data/users.json', JSON.stringify(offers, null, 2), 'utf-8');
        console.log('New User added');
        let answer_json = { 'success': true };
        res.send(answer_json);
    }
    catch (error) {
        let answer_json = { 'success': false };
        res.send(answer_json);
    }
});
app.post('/user-existing', (req, res) => {
    let uname = req.body.username;
    let uemail = req.body.email;
    let answer = {
        sucess: false
    };
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == uname || users[i].email == uemail) {
            answer = {
                sucess: true
            };
        }
    }
    res.json(answer);
});
app.get('/get-offer/:offerId', (req, res) => {
    let offerId = Number.parseInt(req.params.offerId);
    let answer;
    if (Number.isNaN(offerId) || offerId >= data.allOffers.length || offerId <= 0) {
        answer = {
            'offer': undefined,
            'answer_code': 404,
            'answer_message': 'Offer not found'
        };
    }
    else {
        answer = {
            'offer': data.allOffers[offerId - 1],
            'answer_code': 200,
            'answer_message': 'Offer found'
        };
    }
    res.send(answer);
});
