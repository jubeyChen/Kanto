Vue.createApp({
    data() {
      return {
        aboutSubject: '',
        aboutName: '',
        aboutEmail: '',
        aboutTel: '',
        aboutTextarea: '',
        isValidEmail: true,
        isTaiwanMobileValid: true,
        formSubmitted: false, // Track if form has been submitted
      };
    },
    methods: {
      checkEmailValidity() {
        // 使用正則表達式檢查email地址的有效性
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.isValidEmail = regex.test(this.aboutEmail);
      },
      validateTaiwanMobile() {
        let mobileRegex = /^09\d{8}$/;
        this.isTaiwanMobileValid = mobileRegex.test(this.aboutTel);
      },
      submitForm() {
        // Perform form submission tasks
        // Set formSubmitted to true to show error messages if any
        this.formSubmitted = true;
      },

      sendEmail() {
        let subject = this.aboutSubject;
        let isName = this.aboutName;
        let phone = this.aboutTel;
        let email = this.aboutEmail;
        let body = this.aboutTextarea;

        Email.send({
          SecureToken: "adf84833-cc46-45a2-850a-092ac2f86858",
          To: 'kantoasuka1@gmail.com',
          From: "kantoasuka1@gmail.com",
          Subject: subject,
          Body: "Name: " + isName + "<br>Email: " + email + "<br>Phone: " + phone + "<br><br>" + body
        }).then(function (message) {
          alert("您的留言已送出");
        });

        // Set formSubmitted to true after sending email
        this.formSubmitted = true;
      },

    },

    watch: {
      aboutEmail() {
        this.checkEmailValidity();
      },
      aboutTel() {
        this.validateTaiwanMobile();
      }
    },
  }).mount('#app');