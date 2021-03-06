import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { toEntry, TrackDetail } from "../model";
import { open, reload, settings, trash } from "ionicons/icons";
import { formatString, formatTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";

const ViewPage: React.FC = () => {
  const { userId } = useAuth();
  const [showNoData, setShowNoData] = useState(false);
  const [showDelToast, setDelToast] = useState(false);
  const [trackList, setTrackList] = useState<TrackDetail[]>([]);
  const filterTrackList = trackList;
  const categoryList: string[] = [];
  const totalTimeSpent: number[] = [];

  const entriesRef = firestore
    .collection("users")
    .doc(userId)
    .collection("tasks");

  const getListFromFS = async () => {
    await entriesRef
      .orderBy("date", "desc")

      .onSnapshot(({ docs }) => setTrackList(docs.map(toEntry)));
  };
  useEffect(() => {
    getListFromFS();
    return () => {};
  }, []);

  const handleDelete = async (keyName: string) => {
    const entryRef = entriesRef.doc(keyName);
    await entryRef.delete().then(() => {
      console.log("deleted");
    });
    setDelToast(true);
  };

  for (const i of trackList) {
    totalTimeSpent.push(+i.totalTime);
    if (!categoryList.includes(i.category)) {
      categoryList.push(i.category);
    }
  }

  useEffect(() => {
    if (!categoryList.length) {
      setShowNoData(true);
    } else {
      setShowNoData(false);
    }
  }, [categoryList]);

  const filterCategory = (cateName: string) => {
    setTrackList(trackList.filter((rec) => rec.category === cateName));
  };

  let totalTime = totalTimeSpent.reduce((total, value) => total + value, 0);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">View Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardContent>
            <div className="ion-text-center">
              <h2>Tasks List:</h2>
            </div>

            <div className="ion-text-center">
              <IonChip color="light" onClick={getListFromFS}>
                <div className="ion-text-center">
                  <IonIcon icon={reload} />
                </div>
              </IonChip>
              {categoryList.map((category) => (
                <IonChip
                  color="light"
                  key={category}
                  onClick={() => filterCategory(category)}
                >
                  <IonLabel>{category}</IonLabel>{" "}
                </IonChip>
              ))}

              <Link to="/my/category">
                <IonChip color="light">
                  <div className="ion-text-center">
                    <IonIcon icon={settings} />
                  </div>
                </IonChip>
              </Link>
              <p>Click on the gear icon to add/remove category</p>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-center ion-margin-bottom">
          <IonButton
            color="light"
            expand="block"
            className="ion-padding-start ion-padding-end"
            disabled={true}
          >
            <IonText>Overall Spent: {formatTime(totalTime)}</IonText>
          </IonButton>
        </div>
        <IonItem lines="none">
          <IonCol>
            <IonText color="primary">Tasks</IonText>
          </IonCol>
          <IonCol>
            <div className="ion-text-end">
              {" "}
              <IonText color="primary"> Time Spent</IonText>
            </div>
          </IonCol>
        </IonItem>
        {showNoData && (
          <div className="ion-text-center ion-margin-top ion-padding-top">
            {" "}
            <img
              src="/assets/svg/view-noData.svg"
              height="150 px"
              alt="show no data"
            />
            <p>You haven't record any task yet!</p>
          </div>
        )}

        {filterTrackList.map((entry) => (
          <IonItemSliding key={entry.id}>
            <IonItem>
              <IonCol>
                {" "}
                <div className="ion-text-start">
                  {formatString(entry.description)}
                </div>{" "}
              </IonCol>{" "}
              <IonCol>
                <div className="ion-text-end">
                  {formatTime(parseInt(entry.totalTime))}
                </div>{" "}
              </IonCol>
            </IonItem>
            <IonItemOptions side="start">
              <IonItemOption
                color=""
                slot="icon-only"
                routerLink={`/my/view/entries/${entry.id}`}
              >
                <IonIcon icon={open}> </IonIcon>
              </IonItemOption>
              <IonItemOption
                color="light"
                routerLink={`/my/view/entries/${entry.id}`}
              >
                <IonText>
                  <IonText>{entry.category}</IonText>
                </IonText>
              </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end">
              <IonItemOption
                color="danger"
                onClick={() => handleDelete(entry.id)}
              >
                <IonIcon icon={trash}> </IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
        <div className="ion-text-end ion-margin-top"></div>
        <IonToast
          isOpen={showDelToast}
          onDidDismiss={() => setDelToast(false)}
          message="You have deleted the record successfully"
          duration={200}
        />
      </IonContent>
    </IonPage>
  );
};

export default ViewPage;
