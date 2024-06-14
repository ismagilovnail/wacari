import WelcomeBlock from "@/Components/welcome-block/WelcomeBlock";
import Layout from "@/Layouts/Layout";

export default function Home({ countBiography }) {

    return (
        <Layout>
            <WelcomeBlock countBiography={countBiography} />
        </Layout>
    );
}
