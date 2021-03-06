import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { auth, firestore } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const { userId } = useAuth();

  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: false });
  const [errorMessage, setErr] = useState("");
  const defaultCate = [
    "Contact Trace",
    "Main Project",
    "Assignment",
    "Personal Time",
    "Working",
    "Learning",
    "Others",
  ];
  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        userDetail.email,
        userDetail.password
      );
      console.log(credential);
    } catch (error) {
      setErr(error.message!);
      setStatus({ loading: false, error: true });
      console.log(error);
    }
  };

  const setDefaultCate = async () => {
    console.log("Users ", userId);
    await firestore
      .collection("users")
      .doc(userId)
      .set({ category: defaultCate });
  };
  if (loggedIn) {
    setDefaultCate();
    return <Redirect to="/my/home" />;
  }

  if (status.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonPage>
      {status.loading && (
        <div>
          <IonAlert isOpen={status.loading} message={`Loading ...`} />
        </div>
      )}
      {status.error && (
        <IonAlert
          isOpen={status.error}
          onDidDismiss={() => setStatus({ error: false, loading: false })}
          header={"Registration failed"}
          message={`${errorMessage}`}
          buttons={["OK"]}
        />
      )}{" "}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Registration </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardHeader>
            <div className="ion-text-center">
              <img
                src="/assets/svg/openSource.svg"
                alt="login illustration"
                height="150 px"
              />
            </div>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonInput
                value={userDetail.email}
                onIonChange={(e) =>
                  setUserDetail({
                    email: e.detail.value!,
                    password: userDetail.password,
                  })
                }
                type="text"
                placeholder="forcess97@gmail.com"
              />
            </IonItem>
            <IonItem>
              <IonInput
                value={userDetail.password}
                onIonChange={(e) =>
                  setUserDetail({
                    email: userDetail.email,
                    password: e.detail.value!,
                  })
                }
                type="password"
                placeholder="*******"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton
          onClick={handleRegister}
          className="ion-margin-start ion-margin-end"
          expand="block"
        >
          SIGNUP
        </IonButton>
        <IonButton
          routerLink="/login"
          className="ion-margin-start ion-margin-end"
          fill="clear"
          expand="full"
        >
          ALREADY HAVE AN ACCOUNT?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
