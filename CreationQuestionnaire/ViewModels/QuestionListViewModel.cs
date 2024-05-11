using CreationQuestionnaire.Models;
using CreationQuestionnaire.Services;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows;

namespace CreationQuestionnaire.ViewModels;

public class QuestionListViewModel : DependencyObject, INotifyPropertyChanged
{
    public static readonly DependencyProperty LoadedFileNameProperty =
    DependencyProperty.Register("LoadedFileName", typeof(string), typeof(QuestionListViewModel), new PropertyMetadata(null));

    public ObservableCollection<Question>? QuestionList { get; set; }

    public event PropertyChangedEventHandler? PropertyChanged;

    public string LoadedFileName
    {
        get { return (string)GetValue(LoadedFileNameProperty); }
        set { SetValue(LoadedFileNameProperty, value); }
    }

    public QuestionListViewModel()
    {
    }

    // Méthode pour charger les questions à partir du CSV le plus récent
    public void LoadQuestionsFromRecentCsv()
    {
        // Implémentez la logique pour charger les données du CSV le plus récent ici
        // Par exemple, vous pouvez parcourir les fichiers CSV dans un répertoire spécifique et choisir le plus récent
        string recentCsvFilePath = CsvService.FindMostRecentCsvFile();
        LoadedFileName = recentCsvFilePath;

        // Une fois que vous avez trouvé le chemin du fichier CSV le plus récent, chargez les données
        ObservableCollection<Question> loadedQuestions = CsvService.LoadQuestionsFromCsv(recentCsvFilePath);

        // Mettez à jour la propriété QuestionList avec les données chargées
        QuestionList = loadedQuestions;
    }

}
