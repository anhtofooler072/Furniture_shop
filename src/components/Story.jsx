import React from "react";

export default function Story() {
  return (
    <div className="OurStory">
      <div className="aboutUs_Header">
        <div className="TitleBox">
          <h6>About us</h6>
          <h2>Our Story</h2>
        </div>
        <img
          src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/about-01.jpg"
          alt="team sprinting"
          className="aboutUsImg"
        />
        <div className="StoryBlock">
          <div className="StoryBlock_title">
            <h6>About Us</h6>
            <h2>Our team is what we value the most</h2>
          </div>
          <div className="StoryBlock_content">
            <h4>With great people, modern and cool products emerge.</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              rhoncus eget enim eget tincidunt. In finibus nisi ex, eu interdum
              urna euismod sit amet. Morbi sollicitudin in magna sed tristique.
              Nulla pharetra sapien eros, sit amet bibendum nibh consectetur
              quis. Curabitur tortor dolor, fringilla eu fringilla id, dignissim
              in urna. Nulla varius dolor ac eros posuere, nec interdum justo
              condimentum. Phasellus lacinia sit amet tellus at pulvinar.
              Maecenas faucibus porta quam.
            </p>
            <p>
              Ut in lorem ullamcorper velit facilisis pellentesque. In tincidunt
              metus eget arcu congue, ac aliquam velit ultricies. Aliquam
              posuere eu arcu et elementum. Donec pulvinar eget orci et
              pellentesque. Aenean at ultricies quam. Nunc feugiat sapien quis
              pharetra tincidunt. Etiam a viverra nulla. Pellentesque
              consectetur libero est, sed ullamcorper diam convallis ac.
              Praesent a convallis ante. Suspendisse potenti. Sed sed cursus
              erat, et auctor metus.
            </p>
          </div>
        </div>
      </div>
      <div className="CoreValueStatement">
        <h2>Simplicity carried to an extreme becomes elegance</h2>
      </div>
      <div
        className="aboutUs_Inner"
        style={{ textAlign: "center" }}>
        <div className="TitleBox">
          <h6>About us</h6>
          <h2>How it all started</h2>
        </div>
        <p style={{ marginTop: "40px", color: "#7c7c7c", lineHeight: "1.8", fontSize:'18px' }}>
          Proin nec ante eu sem luctus bibendum. Sed ut fringilla dolor. Morbi
          suscipit a nunc eu finibus. Nam rutrum mattis velit eget volutpat.
          Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in dolor
          velit. Vestibulum finibus felis non massa commodo molestie at id
          justo. Quisque sollicitudin elit sit amet facilisis euismod. Fusce at
          arcu sed libero lacinia dignissim id bibendum metus.
        </p>
      </div>
      <div className="StoryBlock">
        <div className="StoryBlock_title">
          <h3>About the founder</h3>
          <p>
            Proin nec ante eu sem luctus bibendum. Sed ut fringilla dolor. Morbi
            suscipit a nunc eu finibus. Nam rutrum mattis velit eget volutpat.
            Fusce egestas mi urna, id pulvinar ipsum dictum eget. Mauris in
            dolor velit. Vestibulum finibus felis non massa commodo molestie at
            id justo. Quisque sollicitudin elit sit amet facilisis euismod.
            Fusce at arcu sed libero lacinia dignissim id bibendum metus. Nam
            rutrum mattis velit eget volutpat. Fusce egestas mi urna, id
            pulvinar ipsum dictum eget.
          </p>
        </div>
        <div className="StoryBlock_content">
          <img
            src="https://websitedemos.net/furniture-shop-04/wp-content/uploads/sites/1116/2022/07/about-02.jpg"
            alt="founder"
          />
        </div>
      </div>
    </div>
  );
}
