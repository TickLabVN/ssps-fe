# Changelog

## [1.1.1](https://github.com/TickLabVN/ssps-fe/compare/v1.1.0...v1.1.1) (2023-11-28)


### Bug Fixes

* **env:** add env into docker image on github container registry ([9153e8e](https://github.com/TickLabVN/ssps-fe/commit/9153e8e5dc2d7b720f24a41b9051e86b77665a5f))

## [1.1.0](https://github.com/TickLabVN/ssps-fe/compare/v1.0.0...v1.1.0) (2023-11-28)


### Features

* **oauth:** enable logging in by google account ([0b5ed7c](https://github.com/TickLabVN/ssps-fe/commit/0b5ed7c291bfa6ddfb2699a281bef6c765c64995))

## 1.0.0 (2023-11-24)


### Features

* **add_ux_sidebar:** add ux for sidebar&navbar, resolve merge conflict, refactor components ([b034d0f](https://github.com/TickLabVN/ssps-fe/commit/b034d0f023a1be9db4f4040a110c86f013167f3b))
* **auth:** create router template and change return type of /api/user ([e2b5cca](https://github.com/TickLabVN/ssps-fe/commit/e2b5cca253e2564c2b72675929f87efff8ca271c))
* **AuthPage, AuthLayout, assets:** keep authpage, change authLayout and add images into assets ([189bb8c](https://github.com/TickLabVN/ssps-fe/commit/189bb8c7220adc72c8a6295d1c5d749cb7f6d275))
* **AuthPage, validateSchema:** move validateSchema, change arrowFunction for AuthPage, AuthLayout ([9d1e871](https://github.com/TickLabVN/ssps-fe/commit/9d1e8710c6aa7d54bf2272476f6483f0ac7f0516))
* **ChooseFileBox:** release Upload file component ([ab5a0c8](https://github.com/TickLabVN/ssps-fe/commit/ab5a0c899925f6da7375bf032b3339032e25f594))
* **devops:** add Dockerfile and docker-compose.yml ([ed9065f](https://github.com/TickLabVN/ssps-fe/commit/ed9065fbc138f32d83b0e5d717d6cbb128aa2a7d))
* **file:** add file-size file in return type when uploading ([c72608f](https://github.com/TickLabVN/ssps-fe/commit/c72608fa574d132329568e7ffd6e773e0cd9f9d0))
* **file:** complete uploading and previewing file ([c914762](https://github.com/TickLabVN/ssps-fe/commit/c9147620e8f29e7cbe8b8c036b3f9e8043742623))
* **file:** preview image after uploading ([d739480](https://github.com/TickLabVN/ssps-fe/commit/d73948000b2e6bcff5ae52437c5865054474691c))
* **formValidate:** config AuthLayout, AuthPage, loginForm; add validateSchema.ts ([92ae9cf](https://github.com/TickLabVN/ssps-fe/commit/92ae9cf8d34a9eebeabb089f38b6d8ab5474b142))
* **home_page:** add component Orders, Slides, images and Edit Homepage and AppLayout ([c3ef3cd](https://github.com/TickLabVN/ssps-fe/commit/c3ef3cdb1fc9927365e434b1c7eb07de3573bd0e))
* **hook:** add useEvent hook to refetch listFiles after deleting file ([c9705f6](https://github.com/TickLabVN/ssps-fe/commit/c9705f6ea6d607eaf018d3720293e1a2e1b7f5ae))
* implement TestPreviewPage, remove Auth to test on mock-server ([2ce2073](https://github.com/TickLabVN/ssps-fe/commit/2ce2073bcd3dc96fbe3539f883da1a162ab16562))
* **navigation_bar:** edit AppNavigation, AppDrawer and ToglleSidebarBtn ([a50e800](https://github.com/TickLabVN/ssps-fe/commit/a50e8002327d7b82522ae8cee3e2308df182952f))
* **navigation:** create template for navigation bar ([63017c7](https://github.com/TickLabVN/ssps-fe/commit/63017c74ee9d1c4291f86daca2a58e595c55e7cc))
* **order:** create templates for 2 form: wallet and order-success ([29a7c41](https://github.com/TickLabVN/ssps-fe/commit/29a7c411da2effb8c6d13eef9e3487eca5f505a5))
* **order:** create workflows template for order printing ([96f29ee](https://github.com/TickLabVN/ssps-fe/commit/96f29ee3aa594e3bed4909a60ae09f62dec1fe59))
* **order:** no changes ([8baf29e](https://github.com/TickLabVN/ssps-fe/commit/8baf29e35794fad559a2fcf109f89f8c7b10dac2))
* **Orders:** edit useRef value ([46f1903](https://github.com/TickLabVN/ssps-fe/commit/46f1903cc8edf62d67e37412ebc3c771409669a5))
* **orders:** no changes ([3fcb277](https://github.com/TickLabVN/ssps-fe/commit/3fcb277710b18ab41ffad8918c0e8075f2ad8924))
* **preview-docs:** add preview document form in order workflow ([1d962a3](https://github.com/TickLabVN/ssps-fe/commit/1d962a354790f366bc9ae9a963fac25447647813))
* **responsive:** keep form when resizing screen ([501fbd8](https://github.com/TickLabVN/ssps-fe/commit/501fbd8a4f63908c7dd742ae106a10ba05fe57a5))
* **template:** create choose-file-box and upload-document-box template ([c9e391b](https://github.com/TickLabVN/ssps-fe/commit/c9e391b35adbe2b58310064e4fd5ed044d7f4a4b))
* **three_order_form:** implement 3 forms and add some types ([b20a177](https://github.com/TickLabVN/ssps-fe/commit/b20a177aca3515820af7d887edfbbb08a15c9a85))
* **upload&preview:** complete reponsive for desktop ([beb2357](https://github.com/TickLabVN/ssps-fe/commit/beb2357d3b601d226ea62bb6676624a04344a253))
* **workflows:** add ci-cd actions and impose conventonal commit messages ([d50942f](https://github.com/TickLabVN/ssps-fe/commit/d50942fe6175f6dbc561179b64b515c5b4315c83))


### Bug Fixes

* **async-await:** add prefix await before getUserData function and renavigate root ([00ad52c](https://github.com/TickLabVN/ssps-fe/commit/00ad52c4ced21c6a2e00ac3463a93766e109fdb9))
* **cd:** rename runner correctly ([b4ce2b1](https://github.com/TickLabVN/ssps-fe/commit/b4ce2b1153752216f41b6fc814c47379a06f3ee7))
* **ChooseFileBox:** fix choose file component ([b30bfc9](https://github.com/TickLabVN/ssps-fe/commit/b30bfc953ba8d4b981627a268eb474bce3f3af5e))
* **choosefilebox:** fix some lg desktop but I don't fix width Dialogbody of choose file component ([0fe7b8a](https://github.com/TickLabVN/ssps-fe/commit/0fe7b8a71a189a9c955b65d488da88ac0a323688))
* **form-ux:** create smoothness between nested dialogs ([96b899a](https://github.com/TickLabVN/ssps-fe/commit/96b899a54591df92266255b5b4c8a0252a417737))
* **format_tailwind:** fix width heigth format ([acdd30e](https://github.com/TickLabVN/ssps-fe/commit/acdd30ea9b6a7ae24fefb274b198a43ebcb0799b))
* **mobile_box:** fix choose file mobile ([34754ba](https://github.com/TickLabVN/ssps-fe/commit/34754ba4f143408a0f44e8132e2d77dfbe5457e1))
* **naming:** rename Form, Box in component/order ([8904e71](https://github.com/TickLabVN/ssps-fe/commit/8904e711d8a7bd7a32376c51648260f53a256e5b))
* **order-form:** handle total cost and state-exchange in mobile order step ([9e7b9e7](https://github.com/TickLabVN/ssps-fe/commit/9e7b9e767f1dd44f6bd456dd35a0fcb9e8461339))
* **order-step:** add prev step and current step in order printing ([59103ee](https://github.com/TickLabVN/ssps-fe/commit/59103ee5f7c88f5ea5e5ea7b2f021c2b4c6a8316))
* **order-workflow:** refactor logic code at 2 components: OrderWorkflowBox & UploadAndPreviewDocBox ([372ec8f](https://github.com/TickLabVN/ssps-fe/commit/372ec8ff41d4710e295e61d5807228c204ddbd35))
* **order:** handle refetching after updating and deleting ([0e3b2df](https://github.com/TickLabVN/ssps-fe/commit/0e3b2df4cb882c343d73916c872fad94d371169e))
* **upload-file:** add body to api ([3d6736d](https://github.com/TickLabVN/ssps-fe/commit/3d6736db269c705d9424222507f4c0369602ce66))
