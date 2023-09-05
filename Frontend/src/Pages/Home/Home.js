import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./home.css";
import picture from "./background.jpg"
import profile from "../../Components/Topbar/profile.png";
import img from "../../assets/HomepagePhoto.jpg";

function Home(props){
  const loggedInUser = props.loggedInUser;
  const [userdata, setUserdata] = useState("");



  if (loggedInUser==="") {
    return <div>
      <p>Hello guest user</p>
      <table class="sideTable">
        {/*<ul>*/}
          <th>Topics</th>
        {/*placeholder links to google until links to threads */}
          <tr><ul><a href="https://www.google.co.uk/search?q=women&source=lmns&tbm=nws&bih=769&biw=1368&hl=en&sa=X&ved=2ahUKEwjugpyjocn2AhUMgv0HHW6ECW0Q_AUoAnoECAEQAg">Women</a></ul></tr>
          <tr><ul><a href="https://www.google.co.uk/search?q=men&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBvYCpGdQDfN2N4L8fPqx9zC3hMlrg%3A1647386590365&ei=3h8xYtbvFdLE8gK94a-ICw&ved=0ahUKEwjW1pqkocn2AhVSolwKHb3wC7EQ4dUDCA0&uact=5&oq=men&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIKCAAQsQMQgwEQQzIHCAAQsQMQQzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDOgUIABCRAjoHCAAQsQMQCjoFCAAQsQM6BAgAEEM6CwgAEIAEELEDEIMBOggIABCxAxCDAVCIggFYl4MBYLKGAWgAcAB4AIABSIgBigKSAQE0mAEAoAEBwAEB&sclient=gws-wiz-news">Men</a></ul></tr>
          <tr><ul><a href="https://www.google.co.uk/search?q=lesbian&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBssne_EKCX4nqcTh4CzE52B0ApEmw%3A1647386610025&ei=8h8xYsKYAbGFhbIPjauV6Ag&ved=0ahUKEwjC2cqtocn2AhWxQkEAHY1VBY0Q4dUDCA0&uact=5&oq=lesbian&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIICAAQsQMQkQIyBwgAELEDEEMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMgsIABCABBCxAxCDATIECAAQQzIFCAAQgAQyBQgAEIAEOgUIABCRAlAAWNcTYOoWaAFwAHgAgAFriAGlBZIBAzUuM5gBAKABAcABAQ&sclient=gws-wiz-news">Lesbian</a></ul></tr>
          <tr><ul><a href="https://www.google.co.uk/search?q=gay&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBtCwZqAJUEyP_FqKQ3SgLBUtenWsg%3A1647386629711&ei=BSAxYoiCK_W58gKJz7bYBg&ved=0ahUKEwjImPy2ocn2AhX1nFwKHYmnDWsQ4dUDCA0&uact=5&oq=gay&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIHCAAQsQMQQzIHCAAQsQMQQzIHCAAQsQMQQzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCxAxCDATIICAAQgAQQsQM6CggAELEDEIMBEENQAFjGAWCnA2gAcAB4AIABW4gBgwKSAQEzmAEAoAEBwAEB&sclient=gws-wiz-news">Gay</a></ul></tr>
          <tr><ul><a href="https://www.google.co.uk/search?q=transgender&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBsXhhPH67y6PqwxZyp9-NM4rIqPmQ%3A1647386643980&ei=EyAxYrm2O8j4gQbElb74Dg&ved=0ahUKEwj5i-O9ocn2AhVIfMAKHcSKD-8Q4dUDCA0&uact=5&oq=transgender&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIHCAAQsQMQQzIHCAAQsQMQQzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMgsIABCABBCxAxCDATIICAAQsQMQgwEyBQgAEIAEOgQIABBDOgoIABCxAxCDARBDOgUIABCxAzoHCAAQsQMQCjoKCAAQsQMQsQMQCjoECAAQClC0BljZFWCQGWgAcAB4AIABfogBpwiSAQQxMC4ymAEAoAEBwAEB&sclient=gws-wiz-news">Transgender</a></ul></tr>
          <tr><ul><a href="https://www.google.co.uk/search?q=lgbtq%2B&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBt3giJoBKx4VJbisCAdibmT5blgYA%3A1647386661177&ei=JSAxYoWdCou4gQaaiaL4DQ&ved=0ahUKEwjFw_zFocn2AhULXMAKHZqECN8Q4dUDCA0&uact=5&oq=lgbtq%2B&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIICAAQsQMQkQIyCAgAEIAEELEDMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKOgsIABCABBCxAxCDAToHCAAQsQMQQzoECAAQQ1AAWIAUYK8eaABwAHgAgAFtiAHOBJIBAzMuM5gBAKABAcABAQ&sclient=gws-wiz-news">Other LGBTQ+</a></ul></tr>
        {/*</ul>*/}
      </table>

      <table class="topTable">
        <tr>
          <th>BBC News</th>
          <th>Google</th>
          <th>The Guardian</th>
        </tr>
        <tr>
          <td><a href="https://www.bbc.co.uk/news/topics/cp7r8vgln2wt/lgbt">LGBT</a></td>
          <td><a href="https://www.google.co.uk/search?q=lgbt&sxsrf=APq-WBvqVH-gBDZhyWKPqyCRMxhiiFdViw:1647382857790&source=lnms&tbm=nws&sa=X&ved=2ahUKEwictrCwk8n2AhXTilwKHZ4nCUEQ_AUoAXoECAIQAw&biw=1368&bih=769&dpr=2">LGBT</a></td>
          <td><a href="https://www.theguardian.com/world/lgbt-rights+society/sexuality">LGBT</a></td>
        </tr>
        <tr>
          <td><a href="https://www.bbc.co.uk/news/topics/cq23pdgvyr0t/gender">Gender</a></td>
          <td><a href="https://www.google.co.uk/search?q=gender&biw=1368&bih=769&tbm=nws&sxsrf=APq-WBsTV3HWwU-tl0uxfi767sge2NLt0g%3A1647382532627&ei=BBAxYqToJcqO8gL5mIyACg&ved=0ahUKEwik-qmVksn2AhVKh1wKHXkMA6AQ4dUDCA0&uact=5&oq=gender&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIECAAQQzIECAAQQzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMgsIABCABBCxAxCDATIICAAQgAQQsQMyCwgAEIAEELEDEIMBOgUIABCABFCfA1j2CGC9EGgAcAB4AIABVogB7wGSAQEzmAEAoAEBwAEB&sclient=gws-wiz-news">Gender</a></td>
          <td><a href="https://www.theguardian.com/world/gender">Gender</a></td>
        </tr>
      </table>

      <img class="image" src={img}/>

    </div>;
  } else{
    return <div>
      <p>Welcome {loggedInUser}</p>
      <table className="sideTable">
        {/*<ul>*/}
        <th>Topics</th>
        {/*placeholder links to google until links to threads */}
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=women&source=lmns&tbm=nws&bih=769&biw=1368&hl=en&sa=X&ved=2ahUKEwjugpyjocn2AhUMgv0HHW6ECW0Q_AUoAnoECAEQAg">Women</a>
          </ul>
        </tr>
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=men&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBvYCpGdQDfN2N4L8fPqx9zC3hMlrg%3A1647386590365&ei=3h8xYtbvFdLE8gK94a-ICw&ved=0ahUKEwjW1pqkocn2AhVSolwKHb3wC7EQ4dUDCA0&uact=5&oq=men&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIKCAAQsQMQgwEQQzIHCAAQsQMQQzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDOgUIABCRAjoHCAAQsQMQCjoFCAAQsQM6BAgAEEM6CwgAEIAEELEDEIMBOggIABCxAxCDAVCIggFYl4MBYLKGAWgAcAB4AIABSIgBigKSAQE0mAEAoAEBwAEB&sclient=gws-wiz-news">Men</a>
          </ul>
        </tr>
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=lesbian&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBssne_EKCX4nqcTh4CzE52B0ApEmw%3A1647386610025&ei=8h8xYsKYAbGFhbIPjauV6Ag&ved=0ahUKEwjC2cqtocn2AhWxQkEAHY1VBY0Q4dUDCA0&uact=5&oq=lesbian&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIICAAQsQMQkQIyBwgAELEDEEMyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMgsIABCABBCxAxCDATIECAAQQzIFCAAQgAQyBQgAEIAEOgUIABCRAlAAWNcTYOoWaAFwAHgAgAFriAGlBZIBAzUuM5gBAKABAcABAQ&sclient=gws-wiz-news">Lesbian</a>
          </ul>
        </tr>
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=gay&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBtCwZqAJUEyP_FqKQ3SgLBUtenWsg%3A1647386629711&ei=BSAxYoiCK_W58gKJz7bYBg&ved=0ahUKEwjImPy2ocn2AhX1nFwKHYmnDWsQ4dUDCA0&uact=5&oq=gay&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIHCAAQsQMQQzIHCAAQsQMQQzIHCAAQsQMQQzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMggIABCABBCxAzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCxAxCDATIICAAQgAQQsQM6CggAELEDEIMBEENQAFjGAWCnA2gAcAB4AIABW4gBgwKSAQEzmAEAoAEBwAEB&sclient=gws-wiz-news">Gay</a>
          </ul>
        </tr>
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=transgender&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBsXhhPH67y6PqwxZyp9-NM4rIqPmQ%3A1647386643980&ei=EyAxYrm2O8j4gQbElb74Dg&ved=0ahUKEwj5i-O9ocn2AhVIfMAKHcSKD-8Q4dUDCA0&uact=5&oq=transgender&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIHCAAQsQMQQzIHCAAQsQMQQzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMgsIABCABBCxAxCDATIICAAQsQMQgwEyBQgAEIAEOgQIABBDOgoIABCxAxCDARBDOgUIABCxAzoHCAAQsQMQCjoKCAAQsQMQsQMQCjoECAAQClC0BljZFWCQGWgAcAB4AIABfogBpwiSAQQxMC4ymAEAoAEBwAEB&sclient=gws-wiz-news">Transgender</a>
          </ul>
        </tr>
        <tr>
          <ul><a
              href="https://www.google.co.uk/search?q=lgbtq%2B&bih=769&biw=1368&hl=en&tbm=nws&sxsrf=APq-WBt3giJoBKx4VJbisCAdibmT5blgYA%3A1647386661177&ei=JSAxYoWdCou4gQaaiaL4DQ&ved=0ahUKEwjFw_zFocn2AhULXMAKHZqECN8Q4dUDCA0&uact=5&oq=lgbtq%2B&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIICAAQsQMQkQIyCAgAEIAEELEDMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKMgcIABCxAxAKOgsIABCABBCxAxCDAToHCAAQsQMQQzoECAAQQ1AAWIAUYK8eaABwAHgAgAFtiAHOBJIBAzMuM5gBAKABAcABAQ&sclient=gws-wiz-news">Other
            LGBTQ+</a></ul>
        </tr>
        {/*</ul>*/}
      </table>

      <table className="topTable">
        <tr>
          <th>BBC News</th>
          <th>Google</th>
          <th>The Guardian</th>
        </tr>
        <tr>
          <td><a href="https://www.bbc.co.uk/news/topics/cp7r8vgln2wt/lgbt">LGBT</a></td>
          <td><a
              href="https://www.google.co.uk/search?q=lgbt&sxsrf=APq-WBvqVH-gBDZhyWKPqyCRMxhiiFdViw:1647382857790&source=lnms&tbm=nws&sa=X&ved=2ahUKEwictrCwk8n2AhXTilwKHZ4nCUEQ_AUoAXoECAIQAw&biw=1368&bih=769&dpr=2">LGBT</a>
          </td>
          <td><a href="https://www.theguardian.com/world/lgbt-rights+society/sexuality">LGBT</a></td>
        </tr>
        <tr>
          <td><a href="https://www.bbc.co.uk/news/topics/cq23pdgvyr0t/gender">Gender</a></td>
          <td><a
              href="https://www.google.co.uk/search?q=gender&biw=1368&bih=769&tbm=nws&sxsrf=APq-WBsTV3HWwU-tl0uxfi767sge2NLt0g%3A1647382532627&ei=BBAxYqToJcqO8gL5mIyACg&ved=0ahUKEwik-qmVksn2AhVKh1wKHXkMA6AQ4dUDCA0&uact=5&oq=gender&gs_lcp=Cgxnd3Mtd2l6LW5ld3MQAzIECAAQQzIECAAQQzIICAAQgAQQsQMyCAgAEIAEELEDMggIABCABBCxAzILCAAQgAQQsQMQgwEyCAgAEIAEELEDMgsIABCABBCxAxCDATIICAAQgAQQsQMyCwgAEIAEELEDEIMBOgUIABCABFCfA1j2CGC9EGgAcAB4AIABVogB7wGSAQEzmAEAoAEBwAEB&sclient=gws-wiz-news">Gender</a>
          </td>
          <td><a href="https://www.theguardian.com/world/gender">Gender</a></td>
        </tr>
      </table>

      <img className="image" src={img}/>
    </div>;
  }
}

export default Home;