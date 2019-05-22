import React, {Component} from 'react'
import Navbar from '../components/common/navbar/navbar'
import Header from '../components/home/header/header'
import PageHead from '../components/common/pageHead/pageHead'
import About from '../components/home/about/about'
import Projects from '../components/home/projects/projects'
import Prismic from 'prismic-javascript';
import Page from '../components/Page';

const apiEndpoint = 'https://eli-portfolio.cdn.prismic.io/api/v2';

class Home extends Component {
    

    static async getInitialProps(context) {
        const req = context.req
        const projects = await this.getProjects(req)
        return {
          projects: projects.results
        }
      }


      static async getProjects (req) {        
        const API = await Prismic.getApi(apiEndpoint, { req })
        return await API.query(Prismic.Predicates.at('document.type', 'works'), {
            orderings: '[my.works.first_publication_date desc]'
        })
      }

    render() {
        // console.log(this.props.projects);
        return (
            <Page>
                <style global jsx>{`
                    body {
                        margin: 0;
                    }
                `}</style>
                <PageHead title="Home | Eli J Marshall" />
                <Navbar color="rgba(1,1,1,0)" />
                <Header />
                <About />
                <Projects />
            </Page>
        )
    }
    
}

export default Home;