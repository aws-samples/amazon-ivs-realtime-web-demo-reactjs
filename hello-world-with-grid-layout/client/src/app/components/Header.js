const Header = () => {

  return (
    <header>
      <h1>Build Real-Time Streaming Demo Web App (React) with Amazon IVS</h1>
      <p>
        This sample demonstrates basic React usage.{" "}
        <b>
          <a href="https://docs.aws.amazon.com/ivs/latest/userguide/multiple-hosts.html">
            Use the AWS Console{" "}
          </a>
        </b>
        to create a <b>Stage</b> and a corresponding <b>ParticipantToken</b>.
        Multiple participants can load this page and put in their own tokens.
        You can{" "}
        <b>
          <a
            href="https://aws.github.io/amazon-ivs-web-broadcast/docs/sdk-guides/stages#glossary"
            target="_blank"
          >
            read more about stages in our public docs.
          </a>
        </b>
      </p>
    </header>
  );
};

export default Header;
