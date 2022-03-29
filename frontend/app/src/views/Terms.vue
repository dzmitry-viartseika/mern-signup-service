<template>
  <div class="app-terms">
    <div class="app-terms__logo">
      <img @click="$router.push('/')" src="../assets/images/logo.png" alt="">
    </div>
    <section class="app-terms__content">
      <h2>
        HOW DOES GeeksforGeeks USE COOKIES?
      </h2>
      <div>
        Last Updated : 23 May, 2018
      </div>

      <p>
        A cookie is a small piece of data that a website asks your browser to store on your computer
        or mobile device. The cookie allows the website to “remember” your actions or preferences
        over time. Most browsers support cookies, but users can set their browsers to decline them and
        can delete them whenever they like.
      </p>

      <p>
        If you use GeeksforGeeks, both GeeksforGeeks and third parties will use cookies to track and
        monitor some of your activities on and off GeeksforGeeks, and store and access some data about
        you, your browsing history, and your usage of GeeksforGeeks.
      </p>

      <p>
        This policy describes how both GeeksforGeeks and other third parties use cookies both within
        and without GeeksforGeeks and how you can exercise a better control over cookies. Please keep
        in mind that this may alter your experience with our platform, and may limit certain features
        (including being logged in as a user).
      </p>

      <p>
        General Browsing: We use cookies that are important for certain technical features of our
        website, like logging into user accounts and implementing fixes and improvements to our
        platform.
      </p>

      <h3>These cookies help us:</h3>

      <ul>
        <li>Remember users’ custom preferences and help create more useful products</li>
        <li>Allow users to opt out of certain types of modeling, tailoring, or personalization in
          our products</li>
        <li>Collect information on our users’ preferences in order to create more useful products</li>
        <li>Cookies can also be used for online behavioural target advertising and to show adverts
          relevant to something that the user searched for in the past</li>
        <li>Advertising: We use cookies to enable advertising with our third-party Partners, which
          in turn allows us to provide many of our services free of charge.
        </li>
      </ul>


      <h3>These cookies:</h3>

      <ul>
        <li>    Customize the ad experience for our users, including tailoring job and display ads to
          the technologies a person has previously looked at, the communities a person has visited,
          and the job ads a person has already seen
        </li>
        <li>    Allow direct communication between a 3rd party partner who hosts a promotional event
          with us, and users who have opted into the promotion
        </li>
        <li>
          Allow us to track when a GeeksforGeeks user sees or clicks on an ad or later visits a
          third-party website or purchases a product on a third-party website

        </li>
        <li>Collect impressions and click data for internal reporting and product optimization</li>
        <li>
          Analytics: We use cookies to compile usage activity in order to better cater our Products
          and Services offerings to you, and to third parties. We DO NOT share identifiable “raw”
          data with our clients or any third parties, however we do make high-level decisions based
          on aggregated data about your usage of our Products and Services.
        </li>
      </ul>


      <h3>These cookies:</h3>

      <ul>
        <li>Monitor site traffic and behavior flows of users</li>
        <li>Measure the effectiveness of on-site products</li>
        <li>Measure the effectiveness of off-site marketing campaigns and tactics</li>
      </ul>

      <h2> WHAT INFORMATION IS COLLECTED ON ME VIA COOKIES?</h2>

      <p>
        In general, we collect most data from you via form submission. However, there are cases when
        visiting our site and/or using our platforms in which we may receive certain information
        through the use of cookies. This data will generally not include personally identifying
        information about you.
      </p>

      <h2>    CONTACT US</h2>

      <p>
        If you have any questions, comments, or concerns regarding this Cookies Policy, please contact App at:
      </p>
      support@test.org
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
  metaInfo() {
    return {
      title: 'Terms',
      meta: [
        {
          name: 'description',
          content: 'Terms',
        },
      ],
    };
  },
})
export default class Terms extends Vue {}
</script>

<style scoped lang="scss">
  .app-terms {
    padding: 20px;
    height: 100vh;

    &__logo {
      display: flex;
      justify-content: center;

      img {
        width: 80px;
        height: 80px;
      }
    }

    &__content {
      margin-top: 20px;

      ul {
        padding-left: 30px;
      }

      h3, h2 {
        margin: 10px 0;
      }

      p + p {
        margin-bottom: 15px;
      }
    }
  }
</style>
