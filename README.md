# ApigeePoC
Help Eupfin Do Apigee PoC

# apigee-org 中包含導出的所有的 apigee 资源
- 通過工具 apigee-sackmesser：https://github.com/apigee/devrel/blob/main/tools/apigee-sackmesser/README.md
- 通過開一台 VM :
  - 安裝 git 後 Clone 上面的 apigee-sackmesser Repo
  - 安裝 docker 
  - 執行 command: ./build.sh -t apigee-sackmesser
  - 實際導出 : docker run -v "$PWD":/opt/apigee apigee-sackmesser export --googleapi -o "euppoc-apigee" -t "$(gcloud auth print-access-token)"
    - 要注意 docker 的執行者是否有權限問題： Docker 容器內部預設是以 root 身份執行，但當您將本機目錄掛載到容器內時，可能會因為本機目錄的權限設定導致容器內的 root 無法寫入
    - 解決方法： 
      1. 在 docker 的執行時，使用 -u 參數來指定容器內的使用者 : sudo docker run -u $(id -u) -v "$PWD":/opt/apigee apigee-sackmesser export --googleapi -o "euppoc-apigee" -t "$(gcloud auth print-access-token)"
      2. 修改權限 sudo chmod g+w . 後再執行
- 等待導出完成後即可將資料轉移到 GCS 中 : gsutil -m cp -r ~/devrel/tools/apigee-sackmesser/euppoc-apigee/* gs://my-apigee-backups/
- 後續要在其他環境中 Deploy : docker run -v "$PWD":/opt/apigee apigee-sackmesser deploy -d /opt/apigee/euppoc-apigee -e "您的目標環境名稱" --googleapi -o "您的 Apigee X 組織名稱" -t "$(gcloud auth print-access-token)"