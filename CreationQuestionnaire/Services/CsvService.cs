using CreationQuestionnaire.Helpers;
using CreationQuestionnaire.Models;
using CsvHelper;
using System.Collections.ObjectModel;
using System.Globalization;
using System.IO;
using System.Text;

namespace CreationQuestionnaire.Services;

public class CsvService
{
    public static void ExportToCsv(List<Question> questionList, string filePath)
    {
        if (questionList == null || questionList.Count == 0)
            return;

        StringBuilder csvContent = new StringBuilder();

        // Créez l'en-tête CSV en incluant les noms des champs
        csvContent.AppendLine("Question,Commentaire,A,B,C,D,E,F,Ap,Bp,Cp,Dp,Ep,Fp,BonneReponse,Points,Multi,Melange,Libre,Chance,Categorie,NotePerso");

        foreach (Question question in questionList)
        {
            // Formatez chaque champ de la question
            string questionField = FormatCsvField(question.QuestionText);
            string commentaireField = FormatCsvField(question.CommentaireText);
            string aField = FormatCsvField(question.A);
            string bField = FormatCsvField(question.B);
            string cField = FormatCsvField(question.C);
            string dField = FormatCsvField(question.D);
            string eField = FormatCsvField(question.E);
            string fField = FormatCsvField(question.F);
            string apField = FormatCsvField(question.Ap);
            string bpField = FormatCsvField(question.Bp);
            string cpField = FormatCsvField(question.Cp);
            string dpField = FormatCsvField(question.Dp);
            string epField = FormatCsvField(question.Ep);
            string fpField = FormatCsvField(question.Fp);
            string bonneReponseField = FormatCsvField(question.BonneReponse);
            string pointsField = FormatCsvField(question.Points);
            string multiField = FormatCsvField(question.MultiReponses);
            string melangeField = FormatCsvField(question.Melange);
            string libreField = FormatCsvField(question.Libre);
            string chanceField = FormatCsvField(question.Chance);
            string categorieField = FormatCsvField(question.Categorie);
            string notePersoField = FormatCsvField(question.NotePerso);

            // Ajoutez les champs à la ligne CSV
            csvContent.AppendLine($"{questionField},{commentaireField},{aField},{bField},{cField},{dField},{eField},{fField},{apField},{bpField},{cpField},{dpField},{epField},{fpField},{bonneReponseField},{pointsField},{multiField},{melangeField},{libreField},{chanceField},{categorieField},{notePersoField}");
        }

        File.WriteAllText(filePath, csvContent.ToString());
    }

    public static string FindMostRecentCsvFile()
    {
        string questionsDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "questions");

        if (Directory.Exists(questionsDirectory))
        {
            string[] csvFiles = Directory.GetFiles(questionsDirectory, "*.csv");

            Array.Sort(csvFiles, (a, b) => new FileInfo(b).LastWriteTime.CompareTo(new FileInfo(a).LastWriteTime));

            return csvFiles.Length > 0 ? csvFiles[0] : null;
        }

        return null;
    }

    // Méthode pour charger les questions à partir d'un fichier CSV
    public static ObservableCollection<Question> LoadQuestionsFromCsv(string csvFilePath)
    {
        ObservableCollection<Question> questions = new ObservableCollection<Question>();

        // Vérifiez si le fichier CSV existe
        if (File.Exists(csvFilePath))
        {
            using (var reader = new StreamReader(csvFilePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                // Utilisez la classe de mapping QuestionMap avec CsvReader
                csv.Context.RegisterClassMap<QuestionMap>();

                // Lecture des enregistrements CSV et ajout à la liste des questions
                while (csv.Read())
                {
                    Question question = csv.GetRecord<Question>();
                    questions.Add(question);
                }
            }
        }

        return questions;
    }

    // Méthode pour formater une valeur de champ CSV
    private static string FormatCsvField(string field)
    {
        if (string.IsNullOrEmpty(field))
        {
            return field;
        }
        // Si la valeur de champ contient une virgule, des guillemets ou des retours à la ligne,
        // elle doit être entourée de guillemets et les guillemets dans la valeur doivent être échappés
        if (field.Contains(",") || field.Contains("\"") || field.Contains("\n"))
        {
            // Échappez les guillemets en doublant les guillemets existants
            field = field.Replace("\"", "\"\"");

            // Entourez la valeur de champ par des guillemets
            field = $"\"{field}\"";
        }
        return field;
    }
}
