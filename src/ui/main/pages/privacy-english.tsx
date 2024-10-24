import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const PrivacyPolicyEnglish = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center px-10 pb-16 w-full">
        <h1 className='font-bold text-[45px] mt-16'>Privacy Policy</h1>
        <p className='text-[20px] opacity-70'>Last modified: October 24, 2024</p>
        <div className='flex flex-col gap-4 max-w-[900px] mt-10 text-justify indent-2'>
          <p>• reFilc (hereinafter referred to as the application) is a mobile, desktop, and web client application that allows you to download and display your data from the e-KRÉTA system in a user-friendly way. Your academic data only travels directly between the application and KRÉTA servers through an encrypted connection.</p>
          <p>
            • The developers and/or operators of reFilc, as well as the application, do not copy, store, or forward your academic and personal data for any purpose or under any circumstances. These are managed by Educational Development Informatikai Zrt., and you can find their data processing information here:
            <span className='mx-2 underline'>
              <Link to={'https://tudasbazis.ekreta.hu/pages/viewpage.action?pageId=4065038'}>tudasbazis.ekreta.hu</Link>
            </span>
          </p>
          <p>• For deletion or modification of your data, please contact your class teacher or your school's system administrator.</p>
          <p>• The application collects anonymous usage statistics, which help us determine the number of users and installations, as well as their platform. You can disable this in the settings. We kindly ask you to keep this feature enabled if possible, so we can have more accurate information about our users' platform distribution.</p>
          <p>• When the application encounters an error, there is an option to send an error report. This does not contain personal and/or academic data, but provides detailed information about the error, its cause, and your device. It is your responsibility to review the data set to be transmitted on the screen that appears before sending. Error reports are stored on the reFilc development interface and in a private Discord room, accessible only to the app developers.</p>
          <p>• The application (on the following platforms: Android, Linux, Windows) checks for new versions through the reFilc API and Github API at each launch, and upon request, downloads and installs updates from here.</p>
          <p>
            • If you have any questions about your data (viewing, deletion, modification, data portability), contact us at
            <span className='mx-2 underline'>
              <Link to={'mailto:social@refilc.hu'}>
                social@refilc.hu
              </Link>
            </span>
            email address, or on our
            <span className='mx-2 underline'>
              <Link to={'/go/s/discord'}>
                Discord
              </Link>
            </span>
            server!
          </p>
          <p>• By using the client application on any device and platform, you acknowledge and accept this privacy policy. The reFilc team reserves the right to modify the policy and is not obligated to notify users of any changes!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicyEnglish;