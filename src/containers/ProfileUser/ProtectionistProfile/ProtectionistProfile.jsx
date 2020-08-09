import React, { useCallback, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import c from 'classnames'
import { AWS_STORAGE } from 'services/config'
import GoogleMapsLocation from 'components/commons/GoogleMapsLocation'
import { observer } from 'mobx-react'
import TextCard from 'components/commons/TextCard'
import LayoutContainer from 'components/commons/LayoutContainer'
import Button from 'components/commons/Button'
import ForAdoption from 'containers/ForAdoption'
import PetsAdopted from 'containers/PetsAdopted'
import TextCardContact from 'components/commons/TextCardContact'
import Title from 'components/commons/Title'
import ButtonShare from 'components/commons/ButtonShare'
import UserContext from 'Context/UserContext'
import noImage from '../noImage.svg'
import styles from './protectionistProfile.scss'

const ProtectionistProfile = ({ user }) => {
  const rootStore = useContext(UserContext)
  const { authStore } = rootStore
  const [isImageNotFound, setIsImageNotFound] = useState(true)
  const [swith, setSwith] = useState(false)
  const { t } = useTranslation('profileUser')

  const handleAdopted = useCallback(() => {
    setSwith(true)
  })

  const handleForAdoption = useCallback(() => {
    setSwith(false)
  })

  const onError = useCallback(() => {
    setIsImageNotFound(false)
  }, [])

  const { name, image, lat, lng, requirementsToAdopt, _id, phone, email, aboutUs } = user

  return (
    <LayoutContainer>
      <div className={styles.containerTitle}>
        <Title
          rolText={t('protectionistUser.role')}
          title={t('common.titleNameUser', {
            name,
          })}
        />
        <ButtonShare
          route="edit-user"
          phone={user.phone || ''}
          canView={authStore.user ? _id === authStore.user._id : false}
        />
      </div>
      <div className={c(styles.containerCard, styles.layourCard)}>
        <img
          onError={onError}
          className={styles.userImage}
          src={image && isImageNotFound ? `${AWS_STORAGE}/${image.filenames[0]}` : noImage}
          alt="photos-users"
        />
        <GoogleMapsLocation
          isProfilePet
          location={{
            lat,
            lng,
          }}
        />
      </div>
      <div className={styles.containerCard}>
        <div className={styles.contact}>
          <TextCardContact title={t('common.contact')} phone={phone} email={email} />
        </div>
        <div className={styles.requirementsToAdopt}>
          <TextCard title={t('common:requirementsToAdopt')} text={requirementsToAdopt} />
        </div>
        <div className={styles.aboutUs}>
          <TextCard title={t('common:aboutUs')} text={aboutUs} />
        </div>
      </div>
      <div className={styles.containerPets}>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleForAdoption} text={t('protectionistUser.needHome')} />
        </div>
        <div className={styles.buttonsSwich}>
          <Button handleClick={handleAdopted} text={t('protectionistUser.adopted')} />
        </div>
      </div>
      <div>
        {swith ? (
          <>
            <PetsAdopted id={_id} />
          </>
        ) : (
          <>
            <ForAdoption id={_id} />
          </>
        )}
      </div>
    </LayoutContainer>
  )
}

ProtectionistProfile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object, PropTypes.bool])
    .isRequired,
}

export default observer(ProtectionistProfile)
