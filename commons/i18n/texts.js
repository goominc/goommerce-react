module.exports = {
  enum: {
    order: {
      status: {
        0: {
          en: 'Initializing',
          ko: '주문생성중',
          'zh-cn': '已提交订单',
          'zh-tw': '已提交訂單',
        },
        100: {
          en: 'Preparing goods',
          ko: '상품준비중',
          'zh-cn': '库存确认中',
          'zh-tw': '庫存確認中',
        },
        101: {
          en: 'Preparing for shipment',
          ko: '배송준비중',
          'zh-cn': '发货准备中',
          'zh-tw': '發貨準備中',
        },
        102: {
          en: 'Ready for shipment',
          ko: '배송준비완료',
          'zh-cn': '发货准备完成',
          'zh-tw': '發貨準備完成',
        },
        200: {
          en: 'Shipping',
          ko: '배송중',
          'zh-cn': '配送中',
          'zh-tw': '配送中',
        },
        201: {
          en: 'Shipped',
          ko: '배송완료',
          'zh-cn': '配送完成',
          'zh-tw': '配送完成',
        },
        202: {
          en: 'Patially shipped',
          ko: '부분배송중',
          'zh-cn': '部分配送中',
          'zh-tw': '部分配送中',
        },
        203: {
          en: 'Delivered',
          ko: '수령확인',
          'zh-cn': '确认已收货',
          'zh-tw': '輸入已收貨',
        },
        300: {
          en: 'Canceled',
          ko: '취소완료',
          'zh-cn': '取消完成',
          'zh-tw': '取消完成',
        },
        400: {
          en: 'Paid',
          ko: '정산완료',
          'zh-cn': '结算完成',
          'zh-tw': '結算完成',
        },
      },
      paymentStatus: {
        0: {
          en: 'Pending payments',
          ko: '결제대기',
          'zh-cn': '等待付款',
          'zh-tw': '等待付款',
        },
        1: {
          en: 'Waiting for additional payment',
          ko: '추가결제대기중',
          'zh-cn': '等待付款',
          'zh-tw': '等待付款',
        },
        100: {
          en: 'Paid',
          ko: '결제완료',
          'zh-cn': '付款完成',
          'zh-tw': '付款完成',
        },
        200: {
          en: 'Waiting for payment',
          ko: '입금대기중',
          'zh-cn': '等待汇款',
          'zh-tw': '等待匯款',
        },
        300: {
          en: 'Refunded',
          ko: '환불완료',
          'zh-cn': '退款完成',
          'zh-tw': '退款完成',
        },
      },
    },
    orderProduct: {
      status: {
        0: {
          en: 'Initilizing',
          ko: '주문생성중',
          'zh-cn': '已提交订单',
          'zh-tw': '已提交訂單',
        },
        100: {
          en: 'Requesting to seller',
          ko: '셀러확인요청',
          'zh-cn': '库存确认申请',
          'zh-tw': '庫存確認申請',
        },
        101: {
          en: 'Check in stock',
          ko: '재고확인중',
          'zh-cn': '库存确认中',
          'zh-tw': '庫存確認中',
        },
        102: {
          en: 'Confirmed stock',
          ko: '재고확인완료',
          'zh-cn': '已确认库存',
          'zh-tw': '已確認庫存',
        },
        103: {
          en: 'Ready to pick up',
          ko: '삼촌픽업대기중',
          'zh-cn': '等待取货',
          'zh-tw': '等待取貨',
        },
        104: {
          en: 'Out of stock',
          ko: '재고없음',
          'zh-cn': '没有库存',
          'zh-tw': '沒有庫存',
        },
        200: {
          en: 'Picked up',
          ko: '픽업완료',
          'zh-cn': '取货完成',
          'zh-tw': '取貨完成',
        },
        201: {
          en: 'Delivered to warehouse',
          ko: '창고로배송됨',
          'zh-cn': '已入库',
          'zh-tw': '已入庫',
        },
        300: {
          en: 'Quality control',
          ko: '검수대기중',
          'zh-cn': '等待检验',
          'zh-tw': '等待檢驗',
        },
        301: {
          en: 'Finished QC',
          ko: '검수완료',
          'zh-cn': '检验完成',
          'zh-tw': '檢驗完成',
        },
        302: {
          en: 'Packed',
          ko: '포장완료',
          'zh-cn': '包装完成',
          'zh-tw': '包裝完成',
        },
        303: {
          en: 'Shipped',
          ko: '배송됨',
          'zh-cn': '已发货',
          'zh-tw': '已發貨',
        },
        400: {
          en: 'Closed',
          ko: '완료',
          'zh-cn': '完成',
          'zh-tw': '完成',
        },
      },
    },
    productVariant: {
      status: {
        0: {
          en: 'Available',
          ko: '재고있음',
          'zh-cn': '有库存',
          'zh-tw': '有庫存',
        },
        10: {
          en: 'Out of stock',
          ko: '재입고 예정',
          'zh-cn': '没有库存',
          'zh-tw': '沒有庫存',
        },
        20: {
          en: 'Sold out',
          ko: '품절',
          'zh-cn': '缺货',
          'zh-tw': '缺貨',
        },
        30: {
          en: 'Discontinued',
          ko: '단종',
          'zh-cn': '断货',
          'zh-tw': '斷貨',
        },
      },
    },
    payment: {
      type: {
        0: {
          en: 'Payment',
          ko: '결제',
          'zh-cn': '结账',
          'zh-tw': '結賬',
        },
        1: {
          en: 'Cancel',
          ko: '취소',
          'zh-cn': '取消',
          'zh-tw': '取消',
        },
        2: {
          en: 'Refund',
          ko: '환불',
          'zh-cn': '退款',
          'zh-tw': '退款',
        },
        3: {
          en: 'Virtual Account',
          ko: '가상계좌',
          'zh-cn': '虚拟帐户 ',
          'zh-tw': '虛擬賬戶',
        },
      },
      status: {
        0: {
          en: 'Success',
          ko: '성공',
          'zh-cn': '成功',
          'zh-tw`': '成功',
        },
        1: {
          en: 'Failed',
          ko: '실패',
          'zh-cn': '失败',
          'zh-tw`': '失敗',
        },
        2: {
          en: 'Checking',
          ko: '확인중',
          'zh-cn': '确认中',
          'zh-tw`': '確認中',
        },
      },
    },
  },
  word: {
    add: {
      en: 'Add',
      ko: '추가',
      'zh-cn': '添加',
      'zh-tw': '添加',
    },
    allCategories: {
      en: 'All Categories',
      ko: '전체 카테고리',
      'zh-cn': '所有分类',
      'zh-tw': '所有分類',
    },
    brands: {
      en: 'Brands',
      ko: '브랜드',
      'zh-cn': '品牌',
      'zh-tw': '品牌',
    },
    categories: {
      en: 'Categories',
      ko: '카테고리',
      'zh-cn': '商品分类',
      'zh-tw': '商品分類',
    },
    customerCenter: {
      en: 'Customer center',
      ko: '고객 센터',
      'zh-cn': '客服中心',
      'zh-tw': '客服中心',
    },
    currency: {
      en: 'Currency',
      ko: '통화',
      'zh-cn': '币种',
      'zh-tw': '貨幣',
    },
    cart: {
      en: 'Cart',
      ko: '장바구니',
      'zh-cn': '购物车',
      'zh-tw': '購物車',
    },
    doOrder: {
      en: 'Check out',
      ko: '주문하기',
      'zh-cn': '提交订单',
      'zh-tw': '提交訂單',
    },
    favoriteBrand: {
      en: 'favoriate brand',
      ko: '단골브랜드',
      'zh-cn': '关注的品牌',
      'zh-tw': '關注的品牌',
    },
    hi: {
      en: 'Hello',
      ko: '안녕하세요',
      'zh-cn': '您好',
      'zh-tw': '您好',
    },
    language: {
      en: 'Languages',
      ko: '언어',
      'zh-cn': '语言',
      'zh-tw': '語言',
    },
    login: {
      en: 'Sign in',
      ko: '로그인',
      'zh-cn': '请登录',
      'zh-tw': '請登錄',
    },
    logout: {
      en: 'Sign out',
      ko: '로그아웃',
      'zh-cn': '退出',
      'zh-tw': '退出',
    },
    myPage: {
      en: 'My Linkshops',
      ko: '마이 페이지',
      'zh-cn': '我的Linkshops',
      'zh-tw': '我的Linkshops',
    },
    register: {
      en: 'Register',
      ko: '회원가입',
      'zh-cn': '免费注册',
      'zh-tw': '免費註冊',
    },
    relatedCategories: {
      en: 'Related Categories',
      ko: '연관 카테고리',
      'zh-cn': '相关分类',
      'zh-tw': '相關分類',
    },
    reorder: {
      en: 'Reorder',
      ko: '재주문',
      'zh-cn': '再次购买',
      'zh-tw': '再次購買',
    },
    quantity: {
      en: 'Quantity',
      ko: '수량',
      'zh-cn': '数量',
      'zh-tw': '數量',
    },
    price: {
      en: 'Total',
      ko: '가격',
      'zh-cn': '价格',
      'zh-tw': '價格',
    },
    product: {
      en: 'Products',
      ko: '상품',
      'zh-cn': '商品',
      'zh-tw': '商品',
    },
    seeAll: {
      en: 'See All',
      ko: '전체보기',
      'zh-cn': '查看全部',
      'zh-tw': '查看全部',
    },
    wishList: {
      en: 'Wish List',
      ko: '위시리스트',
      'zh-cn': '收藏夹',
      'zh-tw': '收藏夾',
    },
    findYourPassword: {
      en: 'Find your password',
      ko: '비밀번호 찾기',
      'zh-cn': '忘记妈妈',
      'zh-tw': '忘記密碼',
    },
    keepMeSignedIn: {
      en: 'Keep me signed in',
      ko: '로그인 상태 유지',
      'zh-cn': '自动登录',
      'zh-tw': '自動登錄',
    },
    shopByBuilding: {
      en: 'Shop by Building',
      ko: '동대문 상가별 매장정보',
      'zh-cn': '东大门商城指南',
      'zh-tw': '東大門商城指南',
    },
    hotItems: {
      en: 'Hot Items',
      ko: '동대문 핫신상',
      'zh-cn': '东大门新品推荐',
      'zh-tw': '東大門新品推薦',
    },
    productPrice: {
      en: 'Price',
      ko: '상품가격',
      'zh-cn': '商品金额',
      'zh-tw': '商品金額',
    },
    tax: {
      en: 'Tax',
      ko: '부가세',
      'zh-cn': '增值税',
      'zh-tw': '增值稅',
    },
    handlingFee: {
      en: 'Handling Fee',
      ko: '사입비',
      'zh-cn': '代购手续费',
      'zh-tw': '代購手續費',
    },
    shippingCost: {
      en: 'Shipping Cost',
      ko: '배송비',
      'zh-cn': '运输费',
      'zh-tw': '運輸費',
    },
    status: {
      en: 'status',
      ko: '상태',
      'zh-cn': '状态',
      'zh-tw': '狀態',
    },
  },
  pcMain: {
    myMenu: {
      myLinkshops: {
        en: 'My Linkshops',
        ko: '마이 링크샵스',
        'zh-cn': '我的Linkshops',
        'zh-tw': '我的Linkshops',
      },
      myOrders: {
        en: 'My Order',
        ko: '주문내역',
        'zh-cn': '我的订单',
        'zh-tw': '我的訂單',
      },
      userInfo: {
        en: 'Account Information',
        ko: '회원 정보',
        'zh-cn': '账户信息',
        'zh-tw': '賬戶信息',
      },
      userHi: {
        en: '!',
        ko: '님',
        'zh-cn': '.',
        'zh-tw': '.',
      },
    },
    search: {
      placeHolder: {
        en: 'Search',
        ko: '검색어를 입력하세요',
        'zh-cn': '输入商品名称',
        'zh-tw': '輸入商品名稱',
      },
    },
    modalLogin: {
      onlyRetailerLinkshopsService: {
        en: 'Only retailer can use Linkshops service.',
        ko: '링크샵스는 사업자회원만이 이용할 수 있는 도매사이트 입니다.',
        'zh-cn': 'Linkshops是批发采购专用平台。',
        'zh-tw': 'Linkshops是批發採購專用平台',
      },
      ifYouWantToUseFurtherService: {
        en: 'If You want to use further service, please sign in or register.',
        ko: '더 많은 서비스 이용을 원하실 경우 로그인 또는 회원가입을 해주세요.',
        'zh-cn': '为了使用所有的服务，敬请登录或账号注册。',
        'zh-tw': '為了使用所有的服務，狗請登錄或賬號註冊',
      },
    },
    signup: {
      agreeToTermsOfUse: {
        en: 'Agree to Terms of Use',
        ko: '이용약관 동의',
        'zh-cn': '同意使用条款',
        'zh-tw': '同意使用條款',
      },
      agreeToPrivacyPolicy: {
        en: 'Agree to Privacy Policy',
        ko: '개인정보 수집방침 동의',
        'zh-cn': '同意隐私权政策',
        'zh-tw': '同意隱私權政策',
      },
      signInInformation: {
        en: 'Sign in Information',
        ko: '로그인 정보',
        'zh-cn': '账号信息',
        'zh-tw': '賬號信息',
      },
      personalInformation: {
        en: 'Personal Information',
        ko: '개인정보',
        'zh-cn': '基本信息',
        'zh-tw': '基本信息',
      },
      businessInformation: {
        en: 'Business Information',
        ko: '사업자정보',
        'zh-cn': '企业信息',
        'zh-tw': '企業信息',
      },
      id: {
        en: 'ID',
        ko: '아이디',
        'zh-cn': '会员名',
        'zh-tw': '會員名',
      },
      idEmail: {
        en: 'ID(E-mail)',
        ko: '아이디(이메일)',
        'zh-cn': '会员名(E-mail)',
        'zh-tw': '會員名(E-mail)',
      },
      password: {
        en: 'Password',
        ko: '비밀번호',
        'zh-cn': '设置密码',
        'zh-tw': '設置密碼',
      },
      passwordAgain: {
        en: 'Password again',
        ko: '비밀번호 확인',
        'zh-cn': '确认密码',
        'zh-tw': '確認密碼',
      },
      name: {
        en: 'Name',
        ko: '성함',
        'zh-cn': '姓名',
        'zh-tw': '姓名',
      },
      phoneNumber: {
        en: 'Phone Number',
        ko: '연락처',
        'zh-cn': '手机号',
        'zh-tw': '手機號',
      },
      useLettersAndNumbers: {
        en: 'Use 6-16 letters and numbers',
        ko: '6~16자 영문 대 소문자, 숫자를 사용하세요.',
        'zh-cn': '支持英文大小字母、数字的组合，6~16字符',
        'zh-tw': '支持英文大小字母, 數字得組合，6~16字符',
      },
      pleaseEnterYourPasswordAgain: {
        en: 'Please enter your password again.',
        ko: '비밀번호를 다시 입력해주세요.',
        'zh-cn': '请再次输入密码',
        'zh-tw': '請再次輸入密碼',
      },
      firstName: {
        en: 'First Name',
        ko: '성',
        'zh-cn': '姓',
        'zh-tw': '性',
      },
      lastName: {
        en: 'Last Name',
        ko: '이름',
        'zh-cn': '名',
        'zh-tw': '名',
      },
      pleaseEnterOnlyNumbersExcept: {
        en: 'Please enter only numbers except \' - \'.',
        ko: ' \' - \'를 제외한 숫자만 입력해 주세요.',
        'zh-cn': '请用数字填空',
        'zh-tw': '請用數字填空',
      },
      bizName: {
        en: 'Brand Name',
        ko: '사업자명',
        'zh-cn': '公司名称',
        'zh-tw': '公司名稱',
      },
      bizNumber: {
        en: 'Business Registration Number',
        ko: '사업자번호',
        'zh-cn': '注册号',
        'zh-tw': '註冊號',
      },
      bizNamePlaceHolder: {
        en: 'Enter your brand name',
        ko: '사업자명을 입력해주세요',
        'zh-cn': '输入公司名称',
        'zh-tw': '輸入公司名稱',
      },
      bizNumberPlaceHolder: {
        en: 'Enter your business number',
        ko: '사업자번호를 입력해주세요',
        'zh-cn': '输入注册号',
        'zh-tw': '輸入註冊號',
      },
      returnAccountNumber: {
        en: 'Bank Account Information',
        ko: '환불계좌번호',
        'zh-cn': '退款账户信息',
        'zh-tw': '退款賬戶信息',
      },
      returnAccountBank: {
        en: 'Bank name',
        ko: '은행명',
        'zh-cn': '银行名称',
        'zh-tw': '銀行名稱',
      },
      returnAccountOwner: {
        en: 'Account Holder',
        ko: '예금주',
        'zh-cn': '帐户持有人',
        'zh-tw': '賬戶持有人',
      },
      returnAccountBankPlaceHolder: {
        en: '** Bank',
        ko: '**은행',
        'zh-cn': '** 银行',
        'zh-tw': '** 銀行',
      },
      returnAccountOwnerPlaceHolder: {
        en: 'Enter your account holder.',
        ko: '예금주를 입력해 주세요',
        'zh-cn': '输入账户持有人',
        'zh-tw': '輸入賬戶持有人',
      },
      back: {
        en: 'Back',
        ko: '뒤로',
        'zh-cn': '返回',
        'zh-tw': '返回',
      },
      naxt: {
        en: 'Next',
        ko: '다음',
        'zh-cn': '下一',
        'zh-tw': '下一',
      },
    },
  },
  pcProductList: {
    sortLowPrice: {
      en: 'Low to High',
      ko: '낮은가격 순',
      'zh-cn': '价格从低到高',
      'zh-tw': '價格從低到高',
    },
    sortHighPrice: {
      en: 'High to Low',
      ko: '높은가격 순',
      'zh-cn': '价格从高到低',
      'zh-tw': '價格從高到低',
    },
    sortLatest: {
      en: 'Newest',
      ko: '최신등록 순',
      'zh-cn': '新品',
      'zh-tw': '新品',
    },
    filterUnder10000: {
      en: '~ ₩9,999',
      ko: '1만원 미만',
      'zh-cn': '~ ₩9,999',
      'zh-tw': '~ ₩9,999',
    },
    filterOver10000: {
      en: '₩10,000 ~',
      ko: '1만원 이상',
      'zh-cn': '₩10,000 ~',
      'zh-tw': '₩10,000 ~',
    },
    filterOver20000: {
      en: '₩20,000 ~',
      ko: '2만원 이상',
      'zh-cn': '₩20,000 ~',
      'zh-tw': '₩20,000 ~',
    },
    filterOver30000: {
      en: '₩30,000 ~',
      ko: '3만원 이상',
      'zh-cn': '₩30,000 ~',
      'zh-tw': '₩30,000 ~',
    },
  },
  pcPayment: {
    payment: {
      en: 'Payment',
      ko: '결제',
      'zh-cn': '结账',
      'zh-tw': '結賬',
    },
    shippingAddress: {
      en: 'Shipping Address',
      ko: '배송 정보',
      'zh-cn': '收货信息',
      'zh-tw': '收貨信息',
    },
    edit: {
      en: 'Edit',
      ko: '정보수정',
      'zh-cn': '信息修改',
      'zh-tw': '信息修改',
    },
    remove: {
      en: 'Remove',
      ko: '삭제',
      'zh-cn': '删除',
      'zh-tw': '刪除',
    },
    contactName: {
      en: 'Contact Name',
      ko: '받는 분',
      'zh-cn': '收货人',
      'zh-tw': '收貨人',
    },
    phoneNumber: {
      en: 'Phone Number',
      ko: '연락처',
      'zh-cn': '手机号',
      'zh-tw': '手機號',
    },
    zipCode: {
      en: 'Zip Code',
      ko: '우편번호',
      'zh-cn': '邮编',
      'zh-tw': '郵編',
    },
    address: {
      en: 'Address',
      ko: '주소',
      'zh-cn': '地址',
      'zh-tw': '地址',
    },
    addNewAddress: {
      en: 'Add a new address',
      ko: '배송지 추가',
      'zh-cn': '添加收货地址',
      'zh-tw': '參加收貨地址',
    },
    alias: {
      en: 'Alias',
      ko: '별명',
      'zh-cn': '昵称',
      'zh-tw': '暱稱',
    },
    orderSummary: {
      en: 'Order Summary',
      ko: '주문내역',
      'zh-cn': '订单性情',
      'zh-tw': '訂單性情',
    },
    paymentInfo: {
      en: 'Payment',
      ko: '결제정보',
      'zh-cn': '付款详情',
      'zh-tw': '付款詳情',
    },
    subtotal: {
      en: 'Subtotal',
      ko: '상품금액',
      'zh-cn': '商品金额',
      'zh-tw': '商品金額',
    },
    tax: {
      en: 'Tax',
      ko: '부가세',
      'zh-cn': '增值税',
      'zh-tw': '增值稅',
    },
    handlingFee: {
      en: 'Handling Fee',
      ko: '사입비',
      'zh-cn': '代购手续费',
      'zh-tw': '代購手續費',
    },
    shippingCost: {
      en: 'Shipping Cost',
      ko: '배송비',
      'zh-cn': '运输费',
      'zh-tw': '運輸費',
    },
    totalPrice: {
      en: 'Total',
      ko: '결제금액',
      'zh-cn': '实付款',
      'zh-tw': '買付款',
    },
    paymentMethod: {
      en: 'Paymen Method',
      ko: '결제수단',
      'zh-cn': '付款方式',
      'zh-tw': '付款方式',
    },
    creditCard: {
      en: 'Credit Card',
      ko: '신용카드',
      'zh-cn': '信用卡',
      'zh-tw': '信用卡',
    },
    placeOrder: {
      en: 'Place Order',
      ko: '결제하기',
      'zh-cn': '去付款',
      'zh-tw': '去付款',
    },
  },
  pcCart: {
    cart: {
      en: 'Cart',
      ko: '장바구니',
      'zh-cn': '购物车',
      'zh-tw': '購物車',
    },
    brands: {
      en: 'Brands',
      ko: '브랜드',
      'zh-cn': '品牌',
      'zh-tw': '品牌',
    },
    products: {
      en: 'Products',
      ko: '상품내용',
      'zh-cn': '商品详情',
      'zh-tw': '商品詳情',
    },
    price: {
      en: 'Price',
      ko: '단가',
      'zh-cn': '单价',
      'zh-tw': '單價',
    },
    quantity: {
      en: 'Quantity',
      ko: '수량',
      'zh-cn': '数量',
      'zh-tw': '數量',
    },
    subtotal: {
      en: 'Subtotal',
      ko: '가격',
      'zh-cn': '金额',
      'zh-tw': '金額',
    },
    total: {
      en: 'Total',
      ko: '총 금액',
      'zh-cn': '合计',
      'zh-tw': '合計',
    },
    productsTotal: {
      en: 'Subtotal',
      ko: '상품금액',
      'zh-cn': '商品金额',
      'zh-tw': '商品金額',
    },
    checkout: {
      en: 'Checkout',
      ko: '주문하기',
      'zh-cn': '提交订单',
      'zh-tw': '提交訂單',
    },
    popupProductAdded: {
      en: 'Product Added To Cart Successfully',
      ko: '선택하신 상품이 장바구니에 담겼습니다.',
      'zh-cn': '선택하신 상품이 장바구니에 담겼습니다.',
      'zh-tw': '선택하신 상품이 장바구니에 담겼습니다.',
    },
    popupGoCart: {
      en: 'Go To Shopping Cart',
      ko: '장바구니로 이동',
      'zh-cn': '장바구니로 이동',
      'zh-tw': '장바구니로 이동',
    },
    popupContinueShopping: {
      en: 'Continue Shopping',
      ko: '쇼핑 계속하기',
      'zh-cn': 'Continue Shopping',
      'zh-tw': 'Continue Shopping',
    },
  },
  pcItemDetail: {
    skuNumber: {
      en: 'SKU Number',
      ko: '상품번호',
      'zh-cn': '商品编码',
      'zh-tw': '商品編號',
    },
    building: {
      en: 'Building',
      ko: '상가건물',
      'zh-cn': '商城名称',
      'zh-tw': '商品名稱',
    },
    brand: {
      en: 'Brand',
      ko: '브랜드',
      'zh-cn': '品牌',
      'zh-tw': '品牌',
    },
    color: {
      en: 'Color',
      ko: '색상',
      'zh-cn': '颜色',
      'zh-tw': '顏色',
    },
    size: {
      en: 'Size',
      ko: '사이즈',
      'zh-cn': '尺码',
      'zh-tw': '尺碼',
    },
    quantity: {
      en: 'Quantity',
      ko: '수량',
      'zh-cn': '数量',
      'zh-tw': '數量',
    },
    orderNow: {
      en: 'Order now',
      ko: '바로 구매하기',
      'zh-cn': '立即购买',
      'zh-tw': '立即購買',
    },
    cart: {
      en: 'Cart',
      ko: '장바구니 담기',
      'zh-cn': '加入购物车',
      'zh-tw': '加人購物車',
    },
    selectColor: {
      en: 'Select color',
      ko: '색상을 선택해 주세요',
      'zh-cn': '请选择颜色',
      'zh-tw': '請選擇顏色',
    },
    addToFavoriteBrands: {
      en: 'Add to favorite brands',
      ko: '단골 브랜드 추가',
      'zh-cn': '关注',
      'zh-tw': '關注',
    },
    favoriteBrands: {
      en: 'Favorite brands',
      ko: '단골 브랜드',
      'zh-cn': '我的关注品牌',
      'zh-tw': '我的關注品牌',
    },
  },
  pcFooter: {
    dongdaemun: {
      en: 'Shop by',
      ko: '동대문',
      'zh-cn': '东大门',
      'zh-tw': '東大門',
    },
    byBuilding: {
      en: 'Building',
      ko: '상가별 매장정보',
      'zh-cn': '商城指南',
      'zh-tw': '商城指南',
    },
    hot: {
      en: 'Hot',
      ko: '동대문',
      'zh-cn': '东大门',
      'zh-tw': '東大門',
    },
    items: {
      en: 'Items',
      ko: '핫신상',
      'zh-cn': '新品推荐',
      'zh-tw': '新品推薦',
    },
    aprilInc: {
      en: 'April Inc.',
      ko: '㈜ 에이프릴',
      'zh-cn': '(株)April',
      'zh-tw': '(株)April',
    },
    ceoKyoungmiSeo: {
      en: 'CEO  Kyoungmi Seo',
      ko: '대표자 서경미 ',
      'zh-cn': '代表理事 徐庚美',
      'zh-tw': '代表理事 徐庚美',
    },
    aprilAddress: {
      en: '#6, Sungwoo BD 324, Toegye-ro, Jung-gu, Seoul, Korea',
      ko: '서울시 중구 퇴계로 324 성우빌딩 6층',
      'zh-cn': '首尔市 中区 退溪路 324, 盛宇大楼 6楼',
      'zh-tw': '首爾市 中區 退溪路 324, 盛宇大樓 6樓',
    },
    businessRegistrationNo: {
      en: 'Business Registration No. 201-86-27310',
      ko: '사업자등록번호 201-86-27310 ',
      'zh-cn': '营业执照号码 201-86-27310',
      'zh-tw': '營業執照號碼 201-86-27310',
    },
    telecommunicationServices: {
      en: 'Telecommunication Services Registration No. Seoul Jung-gu 6087',
      ko: '통신판매업신고 서울중구 60887호 ',
      'zh-cn': '通信销售业申报号码 首尔中区60887号',
      'zh-tw': '通信銷售業申報號碼 首爾中區60887號',
    },
    tel: {
      en: 'Tel. 02-2272-1122',
      ko: 'Tel. 02-2272-1122',
      'zh-cn': 'Tel. 02-2272-1122',
      'zh-tw': 'Tel. 02-2272-1122',
    },
    fax: {
      en: 'Fax. 02-2233-5911',
      ko: 'Fax. 02-2233-5911',
      'zh-cn': 'Fax. 02-2233-5911',
      'zh-tw': 'Fax. 02-2233-5911',
    },
    csEmail: {
      en: 'E-mail cs@linkshops.com',
      ko: 'E-mail cs@linkshops.com',
      'zh-cn': 'E-mail cs@linkshops.com',
      'zh-tw': 'E-mail cs@linkshops.com',
    },
    privacyPolicyManager: {
      en: 'Privacy policy Manager  Youngjo Oh',
      ko: '개인정보관리책임자 오영지',
      'zh-cn': '个人情报负责人 吴映知',
      'zh-tw': '個人情報負責人 吳映知',
    },
    privacyPolicy: {
      en: 'Privacy policy',
      ko: '개인정보취급방침 ',
      'zh-cn': '个人信息保护政策',
      'zh-tw': '個人信息保護政策',
    },
    termsOfUse: {
      en: 'Terms of Use',
      ko: '이용약관',
      'zh-cn': '使用条款',
      'zh-tw': '使用條款',
    },
    customerService: {
      en: 'Customer Service',
      ko: '고객센터 운영시간',
      'zh-cn': '客服中心 营业时间 (韩国时间）',
      'zh-tw': '客服中心 營業時間 (韓國時間）',
    },
    customerServiceTime: {
      en: 'AM 10:00-PM 6:00 (KST)',
      ko: '평일 오전 10시 ~ 오후 6시 (한국 기준)',
      'zh-cn': '10:00~18:00 周一到周五',
      'zh-tw': '10:00~18:00 週一到週五',
    },
    lunchTime: {
      en: 'Lunch 12:30~13:30',
      ko: '점심 오후 12시 30분 ~ 오후 1시 30분',
      'zh-cn': '午休 12:30 ~ 13:30',
      'zh-tw': '午休 12:30~13:30',
    },

    customerServiceDay: {
      en: 'Sat, Sun, holiday Off',
      ko: '주말 및 공휴일 제외',
      'zh-cn': '国家节假日(韩国), 周末休息',
      'zh-tw': '國家節假日(韓國), 週末休息',
    },
    contact: {
      en: 'Contact',
      ko: 'kakao talk',
      'zh-cn': '客服联系',
      'zh-tw': '客服聯繫',
    },
    kakaoTalk: {
      en: 'kakao talk linkshops',
      ko: '구매회원 상담 Linkshops',
      'zh-cn': 'kakao talk linkshops',
      'zh-tw': 'kakao talk linkshops',
    },
    wechat: {
      en: 'Wechat linkshops-china',
      ko: '판매회원 상담 Linkshops_brand',
      'zh-cn': 'Wechat linkshops-china',
      'zh-tw': 'Wechat linkshops-china',
    },
  },
  pcMypage: {
    orderDate: {
      en: 'Order Date',
      ko: '주문날짜',
      'zh-cn': '订单日期',
      'zh-tw': '訂單日期',
    },
    orderProducts: {
      en: 'Products',
      ko: '주문내용',
      'zh-cn': '商品详情',
      'zh-tw': '商品詳情',
    },
    quantity: {
      en: 'Quantity',
      ko: '수량',
      'zh-cn': '数量',
      'zh-tw': '數量',
    },
    orderTotal: {
      en: 'Order Total',
      ko: '결제금액',
      'zh-cn': '实付款',
      'zh-tw': '實付款',
    },
    orderStatus: {
      en: 'Status',
      ko: '주문상태',
      'zh-cn': '交易状态',
      'zh-tw': '交易狀態',
    },
    orderStatusPartialCancel: {
      en: 'Partial Cancel',
      ko: '부분취소',
      'zh-cn': '部分取消',
      'zh-tw': '部分取消',
    },
    orderStatusOutWait: {
      en: 'Ready for Delivery',
      ko: '출고대기',
      'zh-cn': '等待发货',
      'zh-tw': '等待發貨',
    },
    orderStatusOutComplete: {
      en: 'Start Delivery',
      ko: '출고완료',
      'zh-cn': '已发货',
      'zh-tw': '已發貨',
    },
    orderListSubjectOf: {
      en: 'of',
      ko: '의',
      'zh-cn': '的',
      'zh-tw': '的',
    },
    orderListSubjectAnd: {
      en: 'and etc.',
      ko: '외',
      'zh-cn': '以外，',
      'zh-tw': '以外，',
    },
    orderListSubjectBrand: {
      en: 'brands',
      ko: '개 브랜드의',
      'zh-cn': '个品牌的，',
      'zh-tw': '個品牌的，',
    },
    orderListSubjectProduct: {
      en: 'products',
      ko: '개 상품 구매내역',
      'zh-cn': '件商品的订单详情',
      'zh-tw': '個商品的訂單詳情',
    },
    thanksForYourOrder: {
      en: 'Thanks for your order',
      ko: '주문이 완료되었습니다.',
      'zh-cn': '下单完成',
      'zh-tw': '下單完成',
    },
    thanksForYourOrderPayment: {
      en: 'Thanks for your payment',
      ko: '주문 및 결제가 완료되었습니다.',
      'zh-cn': '结账成功',
      'zh-tw': '結賬成功',
    },
    orderDetails: {
      en: 'Order Details',
      ko: '주문 정보',
      'zh-cn': '订单详情',
      'zh-tw': '訂單詳情',
    },
    orderDetail: {
      en: 'Order Detail',
      ko: '주문 날짜',
      'zh-cn': '订单日期',
      'zh-tw': '訂單日期',
    },
    orderNumber: {
      en: 'Order Number',
      ko: '주문 번호',
      'zh-cn': '订单编码',
      'zh-tw': '訂單編碼',
    },
    myOrders: {
      en: 'My Order',
      ko: '주문 내역',
      'zh-cn': '我的订单',
      'zh-tw': '我的訂單',
    },
    payment: {
      en: 'Payment',
      ko: '결제 정보',
      'zh-cn': '结账信息',
      'zh-tw': '結賬信息',
    },
    productPrice: {
      en: 'Price',
      ko: '상품금액',
      'zh-cn': '商品金额',
      'zh-tw': '商品金額',
    },

    promotions: {
      en: 'Promotions',
      ko: '기타',
      'zh-cn': '备注',
      'zh-tw': '備註',
    },
    paymentTotal: {
      en: 'Total',
      ko: '결제금액',
      'zh-cn': '结账金额',
      'zh-tw': '結賬金額',
    },
    shipTo: {
      en: 'Ship to',
      ko: '배송 정보',
      'zh-cn': '配送信息',
      'zh-tw': '配送信息',
    },
    fullName: {
      en: 'Full Name',
      ko: '받는 분',
      'zh-cn': '收货人',
      'zh-tw': '收貨人',
    },
    phoneNumber: {
      en: 'Phone Number',
      ko: '연락처',
      'zh-cn': '手机号',
      'zh-tw': '手機號',
    },
    zipCode: {
      en: 'Zip code',
      ko: '우편번호',
      'zh-cn': '邮编',
      'zh-tw': '郵編',
    },
    address: {
      en: 'Address',
      ko: '주소',
      'zh-cn': '地址',
      'zh-tw': '地址',
    },
    brands: {
      en: 'Brands',
      ko: '브랜드 ',
      'zh-cn': '品牌',
      'zh-tw': '品牌',
    },
    products: {
      en: 'Products',
      ko: '상품내용',
      'zh-cn': '商品详情',
      'zh-tw': '商品詳情',
    },
    subtotal: {
      en: 'Subtotal',
      ko: '단가',
      'zh-cn': '单价',
      'zh-tw': '單價',
    },
    total: {
      en: 'Total',
      ko: '가격',
      'zh-cn': '金额',
      'zh-tw': '金額',
    },
    orderList: {
      en: 'Order List',
      ko: '주문 목록',
      'zh-cn': '订单目录',
      'zh-tw': '訂單目錄',
    },
    account: {
      en: 'Account',
      ko: '회원정보 ',
      'zh-cn': '账户信息',
      'zh-tw': '賬戶信息',
    },
    idPassword: {
      en: 'ID/Password',
      ko: '아이디 / 비밀번호',
      'zh-cn': '账户/密码',
      'zh-tw': '賬戶/密碼',
    },
    information: {
      en: 'Information',
      ko: '개인정보',
      'zh-cn': '个人信息',
      'zh-tw': '個人信息',
    },
    name: {
      en: 'Name',
      ko: '성함',
      'zh-cn': '姓名',
      'zh-tw': '姓名',
    },
    lastName: {
      en: 'Last Name',
      ko: '성',
      'zh-cn': '姓',
      'zh-tw': '性',
    },
    firstName: {
      en: 'First Name',
      ko: '이름',
      'zh-cn': '名字',
      'zh-tw': '名字',
    },
    enterYourPhoneNumber: {
      en: 'Enter your phone number',
      ko: '연락처를 입력해주세요',
      'zh-cn': '请输入手机号',
      'zh-tw': '請輸入手機號',
    },
    businessInformation: {
      en: 'Business Information',
      ko: '사업자정보',
      'zh-cn': '公司信息',
      'zh-tw': '公司信息',
    },
    brandName: {
      en: 'Brand Name',
      ko: '사업자명',
      'zh-cn': '公司名称',
      'zh-tw': '公司名稱',
    },
    enterYourBrandName: {
      en: 'Enter your brand name',
      ko: '사업자명을 입력해주세요',
      'zh-cn': '请输入公司名称',
      'zh-tw': '請輸入公司名稱',
    },
    businessRegistrationNumber: {
      en: 'Business Registration Number',
      ko: '사업자번호 ',
      'zh-cn': '注册号',
      'zh-tw': '註冊號',
    },
    enterYourBusinessNumber: {
      en: 'Enter your business number',
      ko: '사업자번호를 입력해주세요',
      'zh-cn': '请输入注册号',
      'zh-tw': '請輸入註冊號',
    },
    businessRegisteration: {
      en: 'Business Registration',
      ko: '사업자등록증',
      'zh-cn': '商业注册',
      'zh-tw': '商業註冊',
    },
    bankAccountInformation: {
      en: 'Bank Account Information',
      ko: '환불계좌번호',
      'zh-cn': '退款账户编码',
      'zh-tw': '退款賬戶編碼',
    },
    bankName: {
      en: 'Bank Name',
      ko: '은행명',
      'zh-cn': '银行名称',
      'zh-tw': '銀行名稱',
    },
    accountHolder: {
      en: 'Account Holder',
      ko: '예금주',
      'zh-cn': '账户持有人',
      'zh-tw': '賬戶持有人',
    },
    edit: {
      en: 'Edit',
      ko: '수정하기 ',
      'zh-cn': '保存',
      'zh-tw': '保存',
    },
    cancel: {
      en: 'Cancel',
      ko: '취소',
      'zh-cn': '取消',
      'zh-tw': '取消',
    },
    wishList: {
      en: 'Wish List',
      ko: '위시리스트',
      'zh-cn': '收藏夹',
      'zh-tw': '收藏夾',
    },
    product: {
      en: 'Product',
      ko: '상품명',
      'zh-cn': '商品',
      'zh-tw': '商品',
    },
    price: {
      en: '가격',
      ko: 'Price',
      'zh-cn': '单价',
      'zh-tw': '單價',
    },
    remove: {
      en: 'Remove',
      ko: '삭제',
      'zh-cn': '删除',
      'zh-tw': '刪除',
    },
    favoriteBrand: {
      en: 'Favorite Brand',
      ko: '단골브랜드',
      'zh-cn': '关注的品牌',
      'zh-tw': '關注的品牌',
    },
    reorder: {
      en: 'Reorder',
      ko: '재주문',
      'zh-cn': '再次购买',
      'zh-tw': '再次購買',
    },
  },
};