import OnboardingFormAvatar from '../../../../components/OnboardingAvatar/OnboardingAvatar'
import OnboardingForm from '../../../../components/OnboardingForm/OnboardingForm'
import css from './page.module.css'
import NavBarLogo from '../../../../components/NavBarLogo/NavBarLogo'
import Image from 'next/image';


const OnboardingPage = () => {
  return (   
    <div className={css.mainContent}>
     <div className={css.logo}><NavBarLogo/></div> 
     <div className={css.wrapper}>
       
      <h1 className={css.title}>Давайте познайoмимось ближче</h1>
      <OnboardingFormAvatar />
      <OnboardingForm />
      </div>
         <div className={css.imageWrapper}>
          <Image
           src="/image/on_boarding_form/green_sprout.jpg"
           alt="Ілюстрація реєстрації"
           width={720} 
           height={900}
           className={css.image}
          />
         </div>
   
    </div>
 
  )
}

export default OnboardingPage;