const app = Vue.createApp({
    mounted() {
        this.getNews()
    },
    data() {
        return {
            searchText: null,
            getStatusOk: false,
            showNews: false,
            responseData: null,
            articles: null,
        }
    },
    methods: {
        getNews(category='general') {
            var url = this.getUrlString(category)  

            var req = new Request(url)

            fetch(req)
                .then(response => response.json())
                .then(data => { if (data.status == 'ok') {
                    this.getStatusOk = true
                    this.responseData = data
                    console.log(this.responseData)
                    this.articles = this.responseData.articles 
                }})
                .catch(error => {
                    console.error(error)
                })
        },
        getCurrentDate() {
            const today = new Date()
            const year = today.getFullYear()
            const month = String(today.getMonth() + 1).padStart(2, '0')
            const day = String(today.getDate()).padStart(2, '0')
            const currentDate = `${year}-${month}-${day}`
            return currentDate
        },
        getUrlString(category) {
            var url = 'https://newsapi.org/v2/top-headlines?' 
            
            url += 'country=nl&' 
            url += ['from=',this.getCurrentDate(),'&'].join('')  
            url += 'sortBy=popularity&' 
            url += ['category=',category,'&'].join('')

            var query = this.searchText
            if (query != '') {
                try {
                    url += ['q=',query,'&'].join('')
                } 
                catch(error) {
                    console.log(error.message)
                }
            }

            url += 'apiKey=2bc65ed4b6a1463eac931845f1b2f15b'  
            console.log(url)
            return url
        }
    }
})

app.mount("#app")
